import "./App.css";
import NewNote from "./components/newNote";
import Notes from "./components/Notes";

const App = () => {
  
  return (
    <div>
      <h1>Notes</h1>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
