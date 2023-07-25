const express = require("express");
const notesRouter = require('../backend/controllers/notes')
const server = express();
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const {password} = process.env

const uri = `mongodb+srv://gonzalo-masa:${password}@cluster0.zbty2ac.mongodb.net/app-notes?retryWrites=true&w=majority`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('database connection')

  })
  .catch((error) => {
    console.error('Error database:', error)
  })


server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.use('/api/notes', notesRouter)

module.exports = server;