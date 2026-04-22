#!/bin/sh
eval "$(fnm env)"
exec node $HOME/mcps/hnr-knowledge-base-mcp-server/dist/index.js
