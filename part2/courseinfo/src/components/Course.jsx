import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({course}) =>{
  const sum = course.parts
  .map(p => p.exercises)
  .reduce((s,e) => s+e, 0)
  
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course;