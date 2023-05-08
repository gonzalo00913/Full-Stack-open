import React, { useState, useEffect } from "react";
import axios from "axios";
/* import DetailCountries from "./components/DetailCotries"; */

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);
    setSelectedCountry(null);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.includes(searchCountry)
  );

  return (
    <div>
      <div>
        Find countries: <input type="text" onChange={handleSearch} />
      </div>
      {selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt="Flag" />
          <button onClick={() => setSelectedCountry(null)}>Back</button>
        </div>
      ) : (
        <ul>
          {filteredCountries.length > 10 ? (
            <li>Too many matches, specify another filter</li>
          ) : filteredCountries.length === 1 ? (
            <div>
              <h2>{filteredCountries[0].name.common}</h2>
              <p>Capital: {filteredCountries[0].capital}</p>
              <p>Population: {filteredCountries[0].population}</p>
              <h3>Languages</h3>
              <ul>
                {Object.values(filteredCountries[0].languages).map(
                  (language) => (
                    <li key={language}>{language}</li>
                  )
                )}
              </ul>
              <img src={filteredCountries[0].flags.png} alt="Flag" />
            </div>
          ) : (
            filteredCountries.map((country) => (
              <li key={country.cca3}>
                {country.name.common}{" "}
                <button onClick={() => handleSelectCountry(country)}>
                  show
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
