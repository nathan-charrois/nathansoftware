import cors from 'cors'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { handleGetPreferences, handlePostPreferences } from './models/preferences'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/preferences', handleGetPreferences)
app.post('/preferences', handlePostPreferences)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const candidates = [
  path.resolve(process.cwd(), '..', 'build', 'client'),
  path.resolve(__dirname, '..', '..', 'build', 'client'),
  path.resolve(__dirname, '..', 'build', 'client'),
]

const clientDir = candidates.find(p => fs.existsSync(path.join(p, 'index.html')))
if (!clientDir) {
  throw new Error(
    `Could not find SPA build. Run "npm run app:build". Looked in:\n`
    + candidates.join('\n'),
  )
}

app.use(express.static(clientDir, { index: false, maxAge: '1h' }))

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'))
})

export default app
