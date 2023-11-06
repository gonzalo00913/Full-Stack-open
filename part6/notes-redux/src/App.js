import "./App.css";
import NewNote from "./components/newNote";
import Notes from "./components/Notes";
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {

  return (
    <div>
      <h1>Notes</h1>
      <NewNote />
     <VisibilityFilter/>
      <Notes />
    </div>
  );
};

export default App;
