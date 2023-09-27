const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

mongoose.connect(url)
.then(result =>{
    console.log("base de datos conectada");
}).catch((error) =>{
    console.log("error al conectar la base de datos:", error.message);
})

const phonebookSchema = new mongoose.Schema({
    name :{
      type: String,
      minlength: 3,
      required: true,
      unique: true,
    },

    number:{
     type: String,
     minlength: 8,
     required: true
    }
  })

phonebookSchema.plugin(uniqueValidator);

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Phonebook", phonebookSchema)