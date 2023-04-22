import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [counter, setCounter] = useState(0);

  // Metodo para ejecutar y modificar el estado de counter cada un segundo.
  /* setTimeout(() =>
  setCounter(counter +1),
  1000
) */

  /* console.log("render...", counter); */

  const aumentarContardor = () => setCounter(counter + 1);
  const reiniciarContador = () => setCounter(0);
  const volver = () => setCounter(counter - 1);

  const curso = {
    name: "Desarrollo de aplicaciones Half Stack",
    partes: [
      {
        name: "Fundamentos de React",
        ejercicios: 10,
      },

      {
        name: "usando props para pasar informacion",
        ejercicios: 7,
      },

      {
        name: "Estado de un componente",
        ejercicios: 14,
      },
    ],
  };

  const MostrarContador = (props) => {
    return <div>{props.counter}</div>;
  };

  const Boton = (props) => {
    return (
      <div>
        <button onClick={props.handleClick} onclick={props.volver}>
          {props.text}
        </button>
      </div>
    );
  };

  const Cabezera = (props) => {
    return (
      <div>
        <h1>{props.curso}</h1>
      </div>
    );
  };

  const Parte = (props) => {
    return (
      <div>
        <p>
          {props.partes} {props.ejercicios}
        </p>
      </div>
    );
  };

  const Contenido = () => {
    return (
      <div>
        <Parte
          partes={curso.partes[0].name}
          ejercicios={curso.partes[0].ejercicios}
        />
        <Parte
          partes={curso.partes[1].name}
          ejercicios={curso.partes[1].ejercicios}
        />
        <Parte
          partes={curso.partes[2].name}
          ejercicios={curso.partes[2].ejercicios}
        />
      </div>
    );
  };

  const Total = (props) => {
    const totalEjercicios = props.partes.reduce(
      (sum, parte) => sum + parte.ejercicios,
      0
    );

    return (
      <div>
        <p>Total de ejercicios: {totalEjercicios}</p>
      </div>
    );
  };

  return (
    <div>
      <Cabezera curso={curso.name} />
      <Contenido />
      <Total partes={curso.partes} />
      <MostrarContador counter={counter} />
      <Boton handleClick={aumentarContardor} text="click" />
      <Boton handleClick={reiniciarContador} text="reiniciar" />
      <Boton handleClick={volver} text="volver" />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
