const supertest = require('supertest')

const { Note, User } = require('../models')
const app = require('../app')
const { sequelize } = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
]

const generateToken = async () => {
  const testUser = {
    username: 'admin',
    name: 'Admin',
    password: 'password',
  }

  await User.create(testUser)

  const response = await supertest(app).post('/api/login').send(testUser)
  return response.body.token
}

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.findAll()
  return notes.map((note) => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.findAll()
  return users.map((u) => u.toJSON())
}

const syncDb = async () => {
  await Note.sync({ force: true })
  await User.sync({ force: true })
  sequelize.close()
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  generateToken,
  syncDb,
}
