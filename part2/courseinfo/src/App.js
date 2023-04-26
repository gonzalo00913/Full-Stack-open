const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ part }) => (
  <p>
    {part && part.name} {part && part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
    <Part part={parts[3]} />
  </div>
);
const Course = ({ name, parts }) => {
  return (
    <div>
      <h2>{name}</h2>
      <Content parts={parts} />
    </div>
  );
};

const Total = ({ sum }) => <h4>Number of exercises: {sum}</h4>;

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const total = course[0].parts.reduce((sum, part) => sum + part.exercises, 0);
  const totals = course[1].parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h1>Web development Curriculum</h1>
      <Header course={course[0].name} />
      <Content parts={course[0].parts} />
      <Total sum={total} />
      <Header course={course[1].name} />
      <Course parts={course[1].parts} />
      <Total sum={totals} />
    </div>
  );
};

export default App;
