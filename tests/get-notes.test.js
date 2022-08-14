const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const { Note, User } = require('../models')
const { initialNotes, notesInDb, nonExistingId } = require('./test_helper')

beforeEach(async () => {
  // executes before each test in this file
  await Note.destroy({
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

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map((r) => r.content)

    expect(contents).toContain('Browser can execute only Javascript')
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with statuscode 404 id is invalid', async () => {
    const invalidId = '2342423'

    await api.get(`/api/notes/${invalidId}`).expect(404)
  })
})

afterAll(async () => {
  // executes after all tests in this file
  await Note.destroy({
    truncate: true,
  })
})
