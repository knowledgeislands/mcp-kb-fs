import * as path from 'node:path'

/**
 * Resolve a relative path against a root directory and reject any traversal
 * outside that root.
 */
export function resolveWithinRoot(root: string, relativePath: string): string {
  const cleaned = relativePath.replace(/\\/g, '/').replace(/^\/+/, '')
  const resolved = path.resolve(root, cleaned)
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep
  if (resolved !== root && !resolved.startsWith(rootWithSep)) {
    throw new Error(`Path escapes root: "${relativePath}"`)
  }
  return resolved
}

export function errorResult(message: string) {
  return {
    isError: true as const,
    content: [{ type: 'text' as const, text: message }]
  }
}

export function jsonResult(payload: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(payload, null, 2) }]
  }
}

export function isNodeError(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && 'code' in err
}
