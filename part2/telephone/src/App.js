import React, { useState } from "react";
import Filter from "./Components/Filter/Filter";
import Form from "./Components/Form/Form";
import Persons from "./Components/Persons/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "Ada Lovelace", num: "39-44-5323523" },
    { name: "Dan Abramov", num: "12-43-234345" },
    { name: "Mary Poppendieck", num: "39-23-6423122" },
    { name: "Angeles medeiros", num: "221-44-43434" },
    { name: "Antonio luis", num: "15-214-12145" },
    { name: "Florencia venites", num: "3133556641" },
    { name: "Rogel Smit", num: "221-54-21797" },
    { name: "Jorge vega", num: "0121-426765" },
    { name: "Nelson", num: "211-435646" },
    { name: "Gonzalo Masa", num: "221-561-3460" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterName, setFilterName] = useState("");

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
