const express = require('express')
const server = express()
const cors = require('cors')
require('dotenv').config()
const Phonebook = require('./models/phonebook')

server.use(express.json())
server.use(cors())

// GET - Me traigo contactos
server.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((phone) => {
    res.json(phone)
  })
})

// POST - Creo contactos
server.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  })

  phonebook.save().then((saveContact) => {
    res.json(saveContact)
  }).catch(error => next(error))
})

// GET - Me traigo contactos por ID

server.get('/persons/name/:name', (req, res) => {
  const name = req.params.name
  Phonebook.findOne({ name }).then((person) => {
    res.json(person)
  })
})

// DELETE - Elimino un contacto

server.delete('/delete/persons/name/:id', (req, res, next) => {
  const id = req.params.id
  Phonebook.findOneAndDelete(id)
    .then(() => {
      res.status(200).end()
    })
    .catch((error) => next(error))
})

// PUT - Modifico un contacto

server.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name and number are required' })
  }

  const updatedContact = {
    name: body.name,
    number: body.number,
  }

  Phonebook.findByIdAndUpdate(id, updatedContact, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).json({ error: 'Contact not found' })
      }
    })
    .catch((error) => next(error))
})

const PORT = 3001

server.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`)
})
