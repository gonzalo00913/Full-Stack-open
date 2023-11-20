import { useParams } from "react-router-dom";

const SingleAnecdote = ({ anecdotes }) => {
    const { id } = useParams();
    const anecdote = anecdotes.find((a) => a.id === Number(id));
  
    if (!anecdote) {
      return <div>No se encontró la anécdota con el ID: {id}</div>;
    }
  
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <p>Author: {anecdote.author}</p>
        <p>Votes: {anecdote.votes}</p>
        <p>More info: <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    );
  };

export default SingleAnecdote;