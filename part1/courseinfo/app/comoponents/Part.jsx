const Part = ({ course }) => {

  return (
    <div>
     <p>{course.parts[0].name}</p>
     <p>{course.parts[1].name}</p>  
     <p>{course.parts[2].name}</p>    
  </div>
  );
};

export default Part;
