import { useState, useEffect } from "react";
import axios from "axios";
import InputCountry from "./components/InputCountry";



function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);



  const handlerFilterCountries = (event) => {
    setFilterCountries(event.target.value);
    setSelectedCountry(null); // Restablecer el país seleccionado
  };

  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(filterCountries.toLowerCase());
  });

  let countryDisplay;

  if (selectedCountry) {
    const country = selectedCountry;
    countryDisplay = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
        <button onClick={() => setSelectedCountry(null)}>Volver</button>
      </div>
    );
  } else if (filteredCountries.length > 10) {
    countryDisplay = <p>To many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    countryDisplay = filteredCountries.map((country) => (
      <div key={country.name.common}>
      
        <span>{country.name.common}</span>
        <button onClick={() => setSelectedCountry(country)}>Show</button>
      </div>
    ));
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    countryDisplay = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
      </div>
    );
  } else {
    countryDisplay = (
      <p>No countries found.</p>
    );
  }

  return (
    <div className="App">
      <InputCountry value={filterCountries} onChange={handlerFilterCountries} />
      <div>{countryDisplay}</div>
    </div>
  );
}

export default App;
