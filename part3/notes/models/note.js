require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
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
  
module.exports = mongoose.model('Note', noteSchema)