#!/bin/bash
set -ex

pnpm install

# node 16
nvm install 16
echo '\n; node 16' >> results.csv
node dist/index.js >> results.csv

# node 18
nvm install 18
echo '\n; node 18' >> results.csv
node dist/index.js >> results.csv

# node 20
nvm install 20
echo '\n; node 20' >> results.csv
node dist/index.js >> results.csv

# deno
echo '\n; deno' >> results.csv
deno run dist/index.js >> results.csv

# bun
echo '\n; bun' >> results.csv
bun dist/index.js >> results.csv
