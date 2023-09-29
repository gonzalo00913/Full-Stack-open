const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')

logger.info('conectado a ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(result =>{
    console.log('base de datos conectada')
})
.catch(() =>{
    console.log('error la conectarse a la base de datos');
})

app.use(express.json())
app.use('/api/blog', blogRouter)

app.use(middleware.errorHandler)
module.exports = app;