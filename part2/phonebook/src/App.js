// Hay que refactorizar la app 

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  // agrego una persona nueva, si la persona ya existe, recibe un alert para confirmar si quiere modificar a esa persona 
  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const ok = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );
      if (ok) {
        const updatedPerson = { ...existingPerson, number: number };
        axios
          .put(`http://localhost:3001/persons/${existingPerson.id}`, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            console.error("Error al actualizar la persona:", error);
            alert("Error al actualizar la persona. Por favor, inténtalo nuevamente.");
          });
      }
    } else {
      const nameObject = {
        name: newName,
        number: number,
      };
      axios
        .post("http://localhost:3001/persons", nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          console.error("Error al agregar la persona:", error);
          alert("Error al agregar la persona. Por favor, inténtalo nuevamente.");
        });
    }
  };
  // Elimino a una persona de la lista
  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (person) {
      const ok = window.confirm(`Remove ${person.name} from phonebook?`);
      if (ok) {
        axios
          .delete(`http://localhost:3001/persons/${id}`)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id));
          
          })
          .catch((error) => {
            console.error("Error al eliminar la persona:", error);
            alert("Error al eliminar la persona. Por favor, inténtalo nuevamente.");
          });
      }
    }
  };


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    const numericInput = event.target.value.replace(/\D/, "");
    setNumber(numericInput);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter show with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => {
          return (
            <li>
              {person.name} {person.number}
              <button onClick={() => removePerson(person.id)}> delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;

