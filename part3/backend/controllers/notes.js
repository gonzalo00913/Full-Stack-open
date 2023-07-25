const notesRouter = require('express').Router()
const Note = require('../models/notes')


// GET - Me traigo nota
notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })
  
  // POST - Crear una nota
  notesRouter.post('/', (request, response, next) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
    }).catch(error => next(error))
  })
  
  notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  
  // PUT - Actualizar una nota
  notesRouter.put('/:id', (request, response, next) => {
    const id = request.params.id
    const updatedNote = request.body
  
    Note.findByIdAndUpdate(id, updatedNote, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })
  
  // DELETE - Eliminar una nota
  notesRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id
  
    Note.findByIdAndDelete(id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  

  module.exports = notesRouter