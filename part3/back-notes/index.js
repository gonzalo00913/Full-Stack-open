const express = require("express");
const app = express()

app.use(express.json());

/* let phonebook = [
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
  ]; */

  app.get("/api", (request, response) => {
    response.json(phonebook);
  });



  
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
