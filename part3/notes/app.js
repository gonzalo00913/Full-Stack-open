require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())

app.use(express.json())
app.use(middleware.requestLogger)  

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')  

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing/reset', testingRouter)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;