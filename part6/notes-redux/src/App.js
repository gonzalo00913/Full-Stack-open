import "./App.css";
import { useEffect } from 'react'
import NewNote from "./components/newNote";
import Notes from "./components/Notes";
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux'
import {initializeNotes} from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeNotes())  
  }, [dispatch]) 

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
