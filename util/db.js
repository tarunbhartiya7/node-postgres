const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const { nodeEnv } = require('../config/environment')

const { username, password, host, port, database, dialect } = dbConfig[nodeEnv]

const sequelize = new Sequelize({
  username,
  password,
  host,
  port,
  database,
  dialect,
  logging: false,
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }
