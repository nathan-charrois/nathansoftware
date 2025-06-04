import cors from 'cors'
import express from 'express'

import { handleGetPreferences, handlePostPreferences } from './models/preferences.ts'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.get('/preferences', handleGetPreferences)

app.post('/preferences', handlePostPreferences)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
