import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pointer = JSON.parse(readFileSync(join(root, '.wrangler/deploy/config.json'), 'utf8'))
const wranglerPath = resolve(root, '.wrangler/deploy', pointer.configPath)
const config = JSON.parse(readFileSync(wranglerPath, 'utf8'))

const STATIC = [
  '/assets/*',
  '/langs/*',
  '/flags/*',
  '/brands/*',
  '/sponsors/*',
  '/og/**',
  '/favicon.ico',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/logo-mark.png',
  '/og-home.png',
]

config.assets.run_worker_first = ['/**', ...STATIC.map((p) => `!${p}`)]
writeFileSync(wranglerPath, `${JSON.stringify(config, null, 2)}\n`)
console.log(`asset-bypass: ${STATIC.length} static paths skip the Worker`)
