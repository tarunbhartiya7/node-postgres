const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const { Note, User } = require('../models')
const {
  notesInDb,
  initialNotes,
  generateToken,
  syncDb,
} = require('./test_helper')

describe('deletion of a note', () => {
  let token

  beforeEach(async () => {
    await Note.sync({ force: true })
    await User.sync({ force: true })

    await Note.bulkCreate(initialNotes)

    token = await generateToken()
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(initialNotes.length - 1)

    const contents = notesAtEnd.map((r) => r.content)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '324324'

    await api
      .delete(`/api/notes/${invalidId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(404)
  })
})

afterAll(async () => {
  await syncDb()
})
