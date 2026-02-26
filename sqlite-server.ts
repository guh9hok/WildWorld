import { Database } from "bun:sqlite";
import { readFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DB_PATH = "./data/app.db";
const PORT = 3001;
const TOKEN = process.env.DB_TOKEN || "local-dev-token";

if (!existsSync("./data")) {
  mkdirSync("./data", { recursive: true });
}

const db = new Database(DB_PATH, { create: true });
db.exec("PRAGMA journal_mode=WAL;");

function runMigrations() {
  const migrationsFolder = "./src/db/migrations";
  if (!existsSync(migrationsFolder)) return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS __drizzle_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hash TEXT NOT NULL UNIQUE,
      created_at INTEGER
    )
  `);

  const files = readdirSync(migrationsFolder)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const hash = file.replace(".sql", "");
    const existing = db
      .query("SELECT id FROM __drizzle_migrations WHERE hash = ?")
      .get(hash);
    if (existing) continue;

    const sql = readFileSync(join(migrationsFolder, file), "utf-8");
    const statements = sql
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const statement of statements) {
      try {
        db.exec(statement);
      } catch (e: any) {
        console.error(`Migration error in ${file}:`, e.message);
      }
    }

    db.query(
      "INSERT INTO __drizzle_migrations (hash, created_at) VALUES (?, ?)"
    ).run(hash, Date.now());
    console.log(`Applied migration: ${file}`);
  }
}

runMigrations();

const server = Bun.serve({
  port: PORT,
  hostname: "localhost",
  fetch(req) {
    const auth = req.headers.get("Authorization");
    if (auth !== `Bearer ${TOKEN}`) {
      return Response.json({ error: { message: "Unauthorized" } }, { status: 401 });
    }

    if (req.method !== "POST") {
      return Response.json({ error: { message: "Method not allowed" } }, { status: 405 });
    }

    return req.json().then(({ sql, params, method }: { sql: string; params: any[]; method: string }) => {
      try {
        const stmt = db.query(sql);
        let rows: any[];

        if (method === "run") {
          stmt.run(...(params || []));
          rows = [];
        } else if (method === "get") {
          const row = stmt.get(...(params || []));
          rows = row ? [Object.values(row as object)] : [];
        } else {
          const results = stmt.all(...(params || []));
          rows = results.map((r) => Object.values(r as object));
        }

        return Response.json({ rows });
      } catch (e: any) {
        console.error("Query error:", e.message, "SQL:", sql);
        return Response.json({ error: { message: e.message } }, { status: 500 });
      }
    });
  },
});

console.log(`SQLite proxy server running on http://localhost:${PORT}`);
