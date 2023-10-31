const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const logger = require('./utils/logger')
const app = express()
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('conectado a ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(result =>{
    console.log('base de datos conectada')
})
.catch(() =>{
    console.log('error la conectarse a la base de datos');
})

app.use(cors())

app.use(express.json())
app.use(middleware.tokenExtractor)


const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing') 

app.use('/api/blog', blogRouter)
app.use('/api/blog/users', userRouter)
app.use('/api/blog/login', loginRouter)
app.use('/api/testing/reset', testingRouter)

app.use(middleware.errorHandler)

module.exports = app;