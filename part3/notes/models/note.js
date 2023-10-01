require('dotenv').config()
const mongoose = require('mongoose')

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

module.exports = mongoose.model('Note', noteSchema)