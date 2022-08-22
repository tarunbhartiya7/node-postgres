const { connectToDatabase } = require('./util/db')
const app = require('./app')
const { PORT } = require('./config/environment')

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
