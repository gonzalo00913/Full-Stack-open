import React from "react";

const Persons = ({ persons, filterName }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.includes(filterName))
        .map((person) => (
          <li key={person.name}>
            {person.name}: {person.num}
          </li>
        ))}
    </ul>
  );
};

export default Persons;