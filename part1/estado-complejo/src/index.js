import React, { useState } from "react";
import ReactDOM from "react-dom";


const App = () => {
  const [clics, setClics] = useState({
    izquierda: 0, derecha: 0,
  });

  const [todosLosClics, setTodosLosClics] = useState([])

  const aumentarContardorIzquierda = () => {
    setClics({ ...clics, izquierda: clics.izquierda + 1 });
    setTodosLosClics(todosLosClics.concat('L'))
    
  };
  const aumentarContardorDerecha = () => {
    setClics({ ...clics, derecha: clics.derecha + 1 });
    setTodosLosClics(todosLosClics.concat('R'))
    
  };
  
  
  const Boton = ({handleClick,text}) => {
    return (
      <div>
        <button onClick={handleClick}>{text}</button>
        
      </div>
    );
    
  };
 /*debugger;*/

  const Historial = (props) =>{
 /*    console.log("historial", props); */
    if(props.todosLosClics.length === 0){
      return(
        <div>
          la aplicación se usa presionando los botones
        </div>
      )
    }
    return (
      <div>
       Historial de pulsaciones de botones: {todosLosClics.join(' ')}
      </div>
    )
  }
  

  return (
    <div>
      {clics.izquierda}
      <Boton handleClick={aumentarContardorIzquierda} text="Izquierda" />
      <Boton handleClick={aumentarContardorDerecha} text="Derecha" />
      {clics.derecha}
      <Historial todosLosClics={todosLosClics} />
    
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

