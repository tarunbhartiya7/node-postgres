const sequelize = require('sequelize')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { Note } = require('../models')
const { initialNotes, notesInDb, nonExistingId } = require('./test_helper')
beforeEach(async () => {
  await Note.destroy({
    where: {},
    truncate: true,
  })
  await Note.bulkCreate(initialNotes)
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // test('all notes are returned', async () => {
  //   const response = await api.get('/api/notes')
  //   expect(response.body).toHaveLength(initialNotes.length)
  // })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map((r) => r.content)

    expect(contents).toContain('Browser can execute only Javascript')
  })
})

afterAll(async () => {
  await Note.destroy({
    where: {},
    truncate: true,
  })
})
