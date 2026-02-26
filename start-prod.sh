#!/bin/bash
bun run sqlite-server.ts &
SQLITE_PID=$!
sleep 1
/nix/store/1lagpgadaybvs1n2312gysg2phjk89y8-nodejs-20.20.0-wrapped/bin/node node_modules/.bin/next start --port 5000 --hostname 0.0.0.0
kill $SQLITE_PID 2>/dev/null
