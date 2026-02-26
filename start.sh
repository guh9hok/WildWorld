#!/bin/bash
# Kill any existing SQLite server on port 3001
fuser -k 3001/tcp 2>/dev/null || true

# Start SQLite proxy server in background
bun run sqlite-server.ts &
SQLITE_PID=$!

# Wait for SQLite server to be ready
sleep 2

# Start Next.js dev server
/nix/store/1lagpgadaybvs1n2312gysg2phjk89y8-nodejs-20.20.0-wrapped/bin/node node_modules/.bin/next dev --port 5000 --hostname 0.0.0.0

# Clean up SQLite server on exit
kill $SQLITE_PID 2>/dev/null
