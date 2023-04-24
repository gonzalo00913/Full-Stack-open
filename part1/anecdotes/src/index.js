import ReactDOM from "react-dom";
import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const ramdomAnecdotes = (anecdotes) => {
    const ramdom = Math.floor(Math.random() * anecdotes.length);
    return anecdotes[ramdom];
  };
  const [selected, setSelected] = useState(anecdotes[0]);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const newVotes = [...vote];
    newVotes[anecdotes.indexOf(selected)]++;
    setVote(newVotes);
  };

  const handleClick = () => {
    const newAnecdote = ramdomAnecdotes(anecdotes);
    setSelected(newAnecdote);
  };
  const maxVotesIndex = vote.indexOf(Math.max(...vote));
  const maxVotesAnecdote = anecdotes[maxVotesIndex];
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selected}</p>
      <p>Has {vote[anecdotes.indexOf(selected)]} votes</p>
      <Button handleClick={handleClick} text="Next anecdote" />
      <Button handleClick={handleVote} text="Vote" />
      <h2>Anecdote with most votes</h2>
      <p>{maxVotesAnecdote}</p>
      <p>Has {vote[maxVotesIndex]} votes</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
