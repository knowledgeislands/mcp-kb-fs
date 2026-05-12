# Security Policy

## Reporting a Vulnerability

If you find a security issue in `@knowledgeislands/mcp-kb`, **please do not file a public GitHub issue.** Instead, email the maintainer directly:

- **<kris@kris.me.uk>** — subject: `mcp-kb security`

Include:

- A description of the issue and the impact (e.g. "path traversal", "arbitrary file write outside root").
- Steps to reproduce, ideally with a minimal proof-of-concept.
- The version of the package (`npm ls @knowledgeislands/mcp-kb`) and Node version.

You should expect an acknowledgement within 72 hours. We aim to triage, investigate, and ship a fix within 14 days for high-severity issues.

## Scope

`mcp-kb` is a stdio MCP server that exposes read/write access to a local directory of markdown files. It runs locally with the privileges of the user who launched it, and the security boundary is the configured `ROOT_PATH`.

In scope:

- Path containment in `src/utils.ts` (`resolveWithinRoot`) — any input that resolves outside `ROOT_PATH` (traversal, symlink escape, encoded separators, edge cases around trailing slashes).
- Tool handlers in `src/notes.ts` — `kb_read_note`, `kb_list_notes`, and the destructive `kb_write_note` (including `create_dirs` behaviour).
- Boot-time root validation in `src/config.ts`.

Out of scope:

- Issues only reproducible against a forked or modified version.
- Vulnerabilities in upstream dependencies (please report those upstream; open an issue here only if `mcp-kb` exposes the flaw in a way that the upstream project does not).
- Issues that require local OS-level access already higher-privileged than the user running the MCP server (e.g. an attacker who can already write files inside `ROOT_PATH` or replace the binary).
- Misconfiguration of `ROOT_PATH` to a directory the user did not intend to expose.

## Supported Versions

Only the latest published `1.x` release receives security fixes. Older pre-release builds are not supported.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |
