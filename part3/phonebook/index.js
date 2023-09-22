const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan")


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'La ruta no existe' })
}

app.use(express.json())
app.use(morgan('method :method url :url status :status res :res[content-length] - time res :response-time ms'))

let persons = [
  {
    id: 1,
    name: "Gonzalo",
    number: "22156134536",
  },
  {
    id: 2,
    name: "Ezequiel",
    number: "22152561326",
  },
  {
    id: 3,
    name: "Luis",
    number: "088156134536",
  },
];

app.get("/api/persons", (_request, response) => {
  response.json(persons);
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
  const person = persons.find((person) => person.id === Number(id));

  if (!person) {
    response.status(400).json({error:"El id no existe"});
  }
  response.status(200).json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== Number(id));

  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const phone = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  if (body.name === "" || body.number === "") {
    response.status(400).json({error:"Los campos estan vacios"});
  }

  const isDuplicateName = persons.some((person) => person.name === body.name);

  if (isDuplicateName) {
    return response
      .status(400)
      .json({ error: "El nombre ya existe en la agenda" });
  }

  persons = persons.concat(phone);

  response.status(201).json(phone);
});

app.use(unknownEndpoint)

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`servidor iniciado en el puerto ${PORT}`);
});
