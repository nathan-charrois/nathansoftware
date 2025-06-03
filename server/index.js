import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { handlePreferencesRequest } from './preferencesHandler.js'

dotenv.config()

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.post('/preferences', handlePreferencesRequest)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
