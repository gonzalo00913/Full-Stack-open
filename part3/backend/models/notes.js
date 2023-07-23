const mongoose = require('mongoose')
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

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  important: Boolean
})
  
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
  
module.exports = mongoose.model('Note', noteSchema)