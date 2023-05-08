import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter/Filter";
import Form from "./Components/Form/Form";
import Persons from "./Components/Persons/Persons";
import Notification from "./Components/Notification";
import axios from "axios";
import "./index.css"

const App = () => {
  // Declaración de estados
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterName, setFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);

  // Uso useEffect para obtener los datos del servidor
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  // Función para agregar un nuevo nombre y número
  const addName = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:3001/persons?name=${newName}`)
      .then((response) => {
        const existingPerson = response.data[0];
        if (existingPerson) {
          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            const updatedPerson = { ...existingPerson, num: newNum };
            axios
              .put(
                `http://localhost:3001/persons/${existingPerson.id}`,
                updatedPerson
              )
              .then((response) => {
                setPersons(
                  persons.map((person) =>
                    person.id !== existingPerson.id ? person : response.data
                  )
                );
                setNewName("");
                setNewNum("");
                setSuccessMessage(`Updated phone number for ${existingPerson.name}`);
                setTimeout(() => {
                  setSuccessMessage(null);
                }, 5000);
              })
              .catch((error) => {
                setErrorMessage("Failed to update the phone number");
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              });
          }
        } else {
          const personObject = {
            name: newName,
            num: newNum,
          };
          axios
            .post("http://localhost:3001/persons", personObject)
            .then((response) => {
              setPersons(persons.concat(response.data));
              setNewName("");
              setNewNum("");
              setSuccessMessage(`Added ${response.data.name}`);
              setTimeout(() => {
                setSuccessMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setErrorMessage("Failed to add the person to the phonebook");
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch the data from the server");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  // Funciones para manejar cambios en los campos del formulario
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };

  // Renderizado de componentes
  return (
    <div className="app">
      <h1>Phonebook:</h1>
      <Notification message={errorMessage || successMessage} />
      {/* Componente para el campo de búsqueda */}
      <Filter value={filterName} onChange={handleFilter} />

      <h3>Add a new</h3>

      {/* Componente para el formulario */}
      <Form
        onSubmit={addName}
        newName={newName}
        onNameChange={handleNameChange}
        newNum={newNum}
        onNumChange={handleNumChange}
      />

      <h3>Numbers</h3>

      {/* Componente para la lista de personas */}
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
