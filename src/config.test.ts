/**
 * config.ts captures ROOT_PATH at module load time. Each test resets modules
 * and re-imports with a different env to cover both branches of expandHome
 * and the assert guard.
 */
import * as os from 'node:os'
import * as path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let savedRootPath: string | undefined

beforeEach(() => {
  savedRootPath = process.env.ROOT_PATH
  vi.resetModules()
})

afterEach(() => {
  if (savedRootPath === undefined) delete process.env.ROOT_PATH
  else process.env.ROOT_PATH = savedRootPath
})

describe('ROOT_PATH', () => {
  it('expands a leading ~/ to the user home directory', async () => {
    process.env.ROOT_PATH = '~/some-kb'
    const { ROOT_PATH } = await import('./config.js')
    expect(ROOT_PATH).toBe(path.resolve(path.join(os.homedir(), 'some-kb')))
  })

  it('leaves an absolute path unchanged', async () => {
    process.env.ROOT_PATH = '/tmp/explicit-kb'
    const { ROOT_PATH } = await import('./config.js')
    expect(ROOT_PATH).toBe('/tmp/explicit-kb')
  })

  it('throws when ROOT_PATH is unset', async () => {
    delete process.env.ROOT_PATH
    await expect(import('./config.js')).rejects.toThrow(/ROOT_PATH environment variable must be set/)
  })
})
