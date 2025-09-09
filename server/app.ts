import cors from 'cors'
import express from 'express'

import { handleGetPreferences, handlePostPreferences } from './models/preferences'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/preferences', handleGetPreferences)
app.post('/preferences', handlePostPreferences)

export default app
