const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) =>{
    logger.error(error.message)

    if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }else if (error.name === 'JsonWebTokenError'){
        return response.status(400).json({error: error.message})
    }
}

const tokenExtractor = (request, _response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    }
    next()
  
  }

  const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      request.user = user
    }
    next()
  }
  
  module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
  }
  

