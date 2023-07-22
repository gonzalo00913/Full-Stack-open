// The app needs to be refactored
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/persons")
      .then((res) => {
        setPersons(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          .put(
            `http://localhost:3001/api/persons/${existingPerson.id}`,
            updatedPerson
          )
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
            showNotification("Error al actualizar la persona:", error);
            showNotification(
              "Error al actualizar la persona. Por favor, inténtalo nuevamente."
            );
          });
      }
    } else {
      const nameObject = {
        name: newName,
        number: number,
      };
      axios
        .post("http://localhost:3001/api/persons", nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNumber("");
          showNotification(`${response.data.name} added successfully.`);
        })
        .catch((error) => {
          console.error("Error al agregar la persona:", error);
          showNotification(
            "Error al agregar la persona. Por favor, inténtalo nuevamente."
          );
        });
    }
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (person) {
      const ok = window.confirm(`Remove ${person.name} from phonebook?`);
      if (ok) {
        axios
          .delete(`http://localhost:3001/delete/persons/name/${id}`)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id));
          })
          .catch((error) => {
            console.log("Error al eliminar la persona:", error);
            showNotification(
              "Error al eliminar la persona. Por favor, inténtalo nuevamente."
            );
          });
      }
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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

  const filteredPersons = persons.filter(
    (person) =>
      person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container-phonebook">
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
