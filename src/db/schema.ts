import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const submittedAnimals = sqliteTable("submitted_animals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  scientificName: text("scientific_name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  habitat: text("habitat").notNull(),
  diet: text("diet").notNull(),
  lifespan: text("lifespan").notNull(),
  weight: text("weight").notNull(),
  length: text("length").notNull(),
  conservationStatus: text("conservation_status").notNull(),
  imageUrl: text("image_url").notNull(),
  videoId: text("video_id").notNull().default(""),
  funFacts: text("fun_facts").notNull().default("[]"), // JSON array
  locations: text("locations").notNull().default("[]"), // JSON array
  mapRegion: text("map_region").notNull(),
  tags: text("tags").notNull().default("[]"), // JSON array
  status: text("status").notNull().default("pending"), // "pending" | "approved" | "rejected"
  submittedBy: text("submitted_by").notNull().default("Anonymous"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
