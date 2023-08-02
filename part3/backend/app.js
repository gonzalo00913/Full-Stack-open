const express = require("express");
require('express-async-errors')
const config = require("./utils/config")
const notesRouter = require('../backend/controllers/notes')
const server = express();
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()


mongoose.connect(config.MONGO_URI, {
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