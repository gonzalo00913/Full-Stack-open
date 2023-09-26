/* const mongoose = require("mongoose");

const url = `mongodb+srv://gonzalo-masa:rhcjAOxn9Ynzm5ZT@cluster0.zbty2ac.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
}) */