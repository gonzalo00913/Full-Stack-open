import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const DetailCountries = ({city}) => {
  const [wheater, setWheater] = useState();

  useEffect(() => { 
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}
    `)
    .then(response =>{
     setWheater(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }, [city]);

  console.log(wheater);
  return <div>
    <h1></h1>
  </div>;
};

export default DetailCountries;
