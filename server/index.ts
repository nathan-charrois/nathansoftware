import app from './app'

const port = 3001
const host = '0.0.0.0'

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`)
})
