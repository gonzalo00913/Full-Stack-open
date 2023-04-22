import ReactDOM from "react-dom";
import "./app.css";

const App = () => {
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
    <div className="color-fondo">
      <Cabezera curso={curso.name} />
      <Contenido />
      <Total partes={curso.partes} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
