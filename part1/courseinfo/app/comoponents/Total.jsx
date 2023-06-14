const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      <p>{totalExercises}</p>
    </div>
  );
};

export default Total;
