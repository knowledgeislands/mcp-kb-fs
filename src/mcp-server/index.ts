#!/usr/bin/env node

/**
 * mcp-kb
 *
 * Local stdio MCP server providing read/write access to a local directory of
 * markdown files as a knowledge base. Scoped to a single root — all paths are
 * validated against it to prevent directory traversal.
 *
 * Configuration (environment variables):
 *   MCP_KB_ROOT_PATH    Absolute or ~ path to the knowledge base root.
 */

import * as fs from 'node:fs/promises'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { ROOT_PATH } from '../config.js'
import { registerNotesTools } from '../tools/index.js'

console.error(`mcp-kb starting...`)
console.error(`  MCP_KB_ROOT_PATH=${ROOT_PATH}`)

const server = new McpServer({
  name: 'mcp-kb',
  version: '1.1.0'
})

registerNotesTools(server)

const main = async (): Promise<void> => {
  try {
    await fs.access(ROOT_PATH)
  } catch {
    console.error(`mcp-kb: MCP_KB_ROOT_PATH not accessible: ${ROOT_PATH}\nSet MCP_KB_ROOT_PATH to the correct path and restart.`)
    return
  }

  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error(`mcp-kb ready`)
}

main().catch((err) => {
  console.error('mcp-kb fatal:', err)
  process.exit(1)
})
