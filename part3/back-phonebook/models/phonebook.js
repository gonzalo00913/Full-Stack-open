const mongoose = require("mongoose");
require("dotenv").config();
const { password } = process.env;

const uri = `mongodb+srv://gonzalomasa:${password}@phonebool-app.lmoabej.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection");
  })
  .catch((error) => {
    console.error("Error database:", error);
  });

 const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model("Phonebook",phonebookSchema )