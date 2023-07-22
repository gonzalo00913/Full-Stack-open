/* const mongoose = require("mongoose");
require("dotenv").config();
const {password} = process.env;

// URI de conexión a MongoDB
const uri = `mongodb+srv://gonzalo-masa:${password}@cluster0.zbty2ac.mongodb.net/app-notes?retryWrites=true&w=majority`

// Conexión a la base de datos
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
 .then(() => {
    console.log("database connection");

  })
  .catch((error) => {
    console.error("Error database:", error);
  });


// Creación del modelo 'Note' basado en el esquema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});


const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Hola mongoose",
  date: new Date(),
  important: true,
});




// Guardar la nota en la base de datos
note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});


// Buscar todas las notas en la base de datos y mostrarlas en la consola
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
 */