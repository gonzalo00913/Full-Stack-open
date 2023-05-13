const express = require("express");
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

let phonebook = [
  {
    id: 1,
    name: "Gonzalo Masa",
    number: "0221-561-3460",
  },
  {
    id: 2,
    name: "Jorge Vega",
    number: "011-201-7160",
  },
  {
    id: 3,
    name: "Ricardo Molinas",
    number: "12-43-124345",
  },
  {
    id: 4,
    name: "Mary poppendick",
    number: "39-05-546282",
  },
];

app.get("/api", (request, response) => {
  response.json(phonebook);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const numEntries = phonebook.length;
  const message = `Phonebook has ${numEntries} entries. Request received on ${date}`;

  response.send(message);
});

app.get("/api/persons/:id", (request, response) => {
  const {id} = request.params;
  const book = phonebook.find((phonebooks) => phonebooks.id === Number(id));
  if (book) {
    response.json(book);
  } else {
    response.status(404).end("error no existe ese ID en el servidor");
  }
});


app.delete('/api/persons/:id',(request, response) =>{
  const {id} = request.params;
  phonebook = phonebook.filter((phonebooks) => phonebooks.id !== Number(id))
})


const generateId = () => {
  const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(n => n.id))
    : 0;
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    });
  }

  const book = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  phonebook = phonebook.concat(book);
  response.json(book);
});




const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
