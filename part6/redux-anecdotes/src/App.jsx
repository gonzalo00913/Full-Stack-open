import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes"
import { useDispatch } from 'react-redux'
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";


const App = () => {
  const dispatch = useDispatch()

  useEffect(() =>{
    anecdoteService.getAll().then(anecdote => dispatch(setAnecdotes(anecdote)))
  },[])

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification/>
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
