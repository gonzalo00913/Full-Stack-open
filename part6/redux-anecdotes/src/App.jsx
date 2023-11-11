import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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
