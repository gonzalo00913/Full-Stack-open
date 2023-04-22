import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(0);

  // Metodo para ejecutar y modificar el estado de counter cada un segundo.
  /* setTimeout(() =>
  setCounter(counter +1),
  1000
) console.log("render...", counter); */

  const aumentarContardor = () => setCounter(counter + 1);
  const reiniciarContador = () => setCounter(0);
  const volver = () => setCounter(counter - 1);

  
  const MostrarContador = (props) => {
    return <div className="contador-estado">{props.counter}</div>;
  };

  const Boton = (props) => {
    return (
      <div>
        <button className="boton" onClick={props.handleClick} onclick={props.volver}>
          {props.text}
        </button>
      </div>
    );
  };

  return (
    <div className="contenedor-de-todo">
      <MostrarContador counter={counter}  className="contador"/>
      <div className="flex-contenedor">
      <Boton handleClick={reiniciarContador} text="Reiniciar" />
      <Boton handleClick={volver} text="Volver" />
      <Boton handleClick={aumentarContardor} text="Clic" />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
