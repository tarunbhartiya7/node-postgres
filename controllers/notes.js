const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { SECRET } = require('../config/environment')

const { Note, User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const noteFinder = async (req, res, next) => {
  found = await Note.findByPk(req.params.id)
  if (found) {
    req.note = found
    next()
  } else {
    res.status(404).end()
  }
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.important) {
    where.important = req.query.important === 'true'
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search,
    }
  }

  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  })

  res.json(notes)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const note = await Note.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    })
    res.json(note)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.post('/bulk-create', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    await Note.bulkCreate([
      {
        content: 'Content 1',
        important: false,
        userId: user.id,
        date: new Date(),
      },
      {
        content: 'Content 2',
        important: false,
        userId: user.id,
        date: new Date(),
      },
      {
        content: 'Content 3',
        important: false,
        userId: user.id,
        date: new Date(),
      },
    ])
    res.json('Multiple items created')
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy()
  }
  res.status(204).end()
})

router.put('/:id', tokenExtractor, noteFinder, async (req, res) => {
  if (req.note) {
    req.note.important = req.body.important
    await req.note.save() // or you can use the note.update method as well
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

module.exports = router
