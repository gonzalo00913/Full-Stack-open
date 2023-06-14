 const mongoose = require("mongoose");

const password = "wTyWguGa1rFnikpo";

const uri = `mongodb+srv://gonzalomasa:${password}@cluster0.q3bktvh.mongodb.net/agenda?retryWrites=true&w=majority`;

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log("database connection");

  })
  .catch((error) => {
    console.error("Error database:", error)
  });


  const agendaSchema = new mongoose.Schema({
    nombre: String,
    numero: Number
  });


  const Agenda = mongoose.model("Agenda", agendaSchema);

  const agendas = new Agenda({
    nombre: "romina",
    numero: "0385215466428"
  })


  agendas.save()
  .then(result => {
    console.log("Guardado exitoso:", result);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Error al guardar:", error);
    mongoose.connection.close();
  });

