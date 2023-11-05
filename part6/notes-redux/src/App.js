import "./App.css";
import NewNote from "./components/newNote";
import Notes from "./components/Notes";

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }
  return (
    <div>
      <h1>Notes</h1>
      <NewNote />
      <div>
        all          <input type="radio" name="filter"
          onChange={() => filterSelected('ALL')} />
        important    <input type="radio" name="filter"
          onChange={() => filterSelected('IMPORTANT')} />
        nonimportant <input type="radio" name="filter"
          onChange={() => filterSelected('NONIMPORTANT')} />
      </div>
      <Notes />
    </div>
  );
};

export default App;
