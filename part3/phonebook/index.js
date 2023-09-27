require("dotenv").config();
const Phonebook = require("./models/phonebook");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
const morgan = require("morgan");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "La ruta no existe" });
};

app.use(express.json());
app.use(
  morgan(
    "method :method url :url status :status res :res[content-length] - time res :response-time ms"
  )
);
app.use(cors());

app.get("/api/persons", (_request, response) => {
  Phonebook.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/info", (_request, response) => {
  const currentDate = new Date();
  const numPersons = persons.length;

  const formattedDate =
    currentDate.toDateString() + " " + currentDate.toLocaleTimeString();
  const infoResponse = `<p>Fecha y hora de la solicitud: ${formattedDate}</p> <p>Cantidad de entradas en la agenda: ${numPersons}</p>`;

  response.send(infoResponse);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = Phonebook.findById(id);

  if (!id) {
    response.status(400).json({ error: "El id no existe" });
  }

  response.status(200).json(person);
});

app.delete("/api/persons/:id", (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const phone = new Phonebook({
    name: body.name,
    number: body.number,
  });

  phone
    .save()
    .then((savedPhone) => {
      response.json(savedPhone);
    })
    .catch(error => next(error))
});

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error);
};


app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`servidor iniciado en el puerto ${PORT}`);
});
