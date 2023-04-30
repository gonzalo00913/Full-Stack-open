import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter/Filter";
import Form from "./Components/Form/Form";
import Persons from "./Components/Persons/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then((response) => {
    setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    let isDuplicate = false;
    persons.forEach((person) => {
      if (person.name === newName) {
        isDuplicate = true;
      }
    });
    if (isDuplicate) {
      alert(`${newName} Is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        num: newNum,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNum("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterName} onChange={handleFilter} />

      <h3>Add a new</h3>

      <Form
        onSubmit={addName}
        newName={newName}
        onNameChange={handleNameChange}
        newNum={newNum}
        onNumChange={handleNumChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
