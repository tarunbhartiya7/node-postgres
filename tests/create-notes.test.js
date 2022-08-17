const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const { Note, User } = require('../models')
const { notesInDb } = require('./test_helper')

describe('addition of a new note', () => {
  let token

  beforeEach(async () => {
    await Note.sync({ force: true })
    await User.sync({ force: true })

    const testUser = {
      username: 'admin',
      name: 'Admin',
      password: 'password',
    }

    await User.create(testUser)

    const response = await api.post('/api/login').send(testUser)
    token = response.body.token
  })

  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }
    await api
      .post('/api/notes')
      .set('Authorization', 'Bearer ' + token)
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(1)
    const contents = notesAtEnd.map((n) => n.content)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('fails with status code 400 if data invaild', async () => {
    const newNote = {
      important: true,
    }

    await api
      .post('/api/notes')
      .set('Authorization', 'Bearer ' + token)
      .send(newNote)
      .expect(400)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(0)
  })
})

afterAll(async () => {
  await Note.sync({ force: true })
  await User.sync({ force: true })
})
