require('dotenv').config()

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || 'secret',
}
