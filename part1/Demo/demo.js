const curso = {
  partes:[
      {
        name: "Fundamentos de React",
        ejercicio:10
      },
      
      {
        name:"usando props para pasar informacion",
        ejercicio :7
      },
      
      {
        name:"Estado de un componente",
        ejercicio:14
      }
    ]

}
console.log(curso.partes[0].name);

let resultadoSuma = 0
for(let propiedad in curso){
  for (let i = 0; i < curso[propiedad].length; i ++){
   resultadoSuma += curso[propiedad][i].ejercicio
  }
  console.log(resultadoSuma);
}
 
 for (let property in obj) {
  for (let i = 0; i < obj[property].length; i++) {
    console.log(obj[property][i]);
  }
} 
const [clicks, setClicks] = useState({
  left: 0, right: 0
})

const handleLeftClick = () =>
  setClicks({
     ...clicks, 
    left: clicks.left + 1 
    })

  const handlerightClick = () =>
  setClicks({
     ...clicks, 
     left: clicks.right + 1 })


     