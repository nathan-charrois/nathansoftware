import cors from 'cors'
import express from 'express'
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from the backend!')
})

app.post('/preferences', (req, res) => {
  const formValues = req.body
  console.log('Received form values:', formValues)

  res.json({
    message: 'Preferences received successfully!',
    receivedValues: formValues,
    meal: {
      title: 'Sample Meal (from POST)',
      imageUrl: 'https://example.com/sample-meal-post.jpg',
    },
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
