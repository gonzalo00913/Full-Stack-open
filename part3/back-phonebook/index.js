const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();
const Phonebook = require("./models/phonebook");

server.use(express.json());
server.use(cors());

// GET - Me traigo contactos
server.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((phone) => {
    res.json(phone);
  });
});

// POST - Creo contactos
server.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  });

  phonebook.save().then((saveContact) => {
    res.json(saveContact);
  });
});

// GET - Me traigo contactos por ID

server.get("/persons/name/:name", (req, res) => {
  const name = req.params.name;
  Phonebook.findOne({ name }).then((person) => {
    res.json(person);
  });
});

// DELETE - Elimino un contacto

server.delete("/delete/persons/name/:id", (req, res, next) => {
  const id = req.params.id;
  Phonebook.findOneAndDelete(id)
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => next(error));
});

// PUT - Modifico un contacto

server.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  const updatedContact = {
    name: body.name,
    number: body.number,
  };

  Phonebook.findByIdAndUpdate(id, updatedContact, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: "Contact not found" });
      }
    })
    .catch((error) => next(error));
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
});



/* server.get("/info", (req, res) => {
  const infoPersons = persons.length;
  const info = `Phonebook has ${infoPersons} persons`;
  const date = Date();
  const all = info + ", " + date;
  res.send(all);
});

server.get("/persons/:id", (req, res) => {
  const id = req.params.id;
  const per = persons.find((person) => person.id === Number(id));
  if (per) {
    res.status(200).json(per);
  } else {
    res.status(404).send("el usuario no existe");
  }
});

server.delete("/delete/persons/:id", (req, res) => {
  const id = req.params.id;
  const initialLength = persons.length;
  persons = persons.filter((person) => person.id !== Number(id));
  if (persons.length < initialLength) {
    res.status(204).send("Usuario eliminado");
  } else {
    res.status(404).send("El usuario no existe");
  }
});


const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0
  return maxId + 1
}

server.post("/api/persons", (req,res) =>{
  const body = req.body
  if(!body.name || !body.number){
    return res.status(400).json({ 
      error: 'faltan datos' 
    })
  }

  const existingPersonName = persons.find((person) => person.name === body.name);
  const existingPersonNumber = persons.find((num) => num.number === body.number);
  if (existingPersonName || existingPersonNumber) {
    return res.status(400).send("Ya existe ese nombre o numero de persona");
  }

   const personsObj = {
    name : body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(personsObj)
  res.json(personsObj)
})
 */
