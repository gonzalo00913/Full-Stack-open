import React from "react";
import axios from "axios";

const Persons = ({ persons, filterName, setPersons }) => {
  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${personToDelete.id}`)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id));
        })
      }
  };

return (
    <ul>
      {persons
        .filter((person) => person.name.includes(filterName))
        .map((person) => (
          <li key={person.name}>
            {person.name}: {person.num}
            <button onClick={() => handleDelete(person)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;