import React, { useState } from "react";
import Button from "./components/Button";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  console.log(selected);
  const [vote, setVote] = useState(anecdotes.map((_) => 0));
  const [votes, setVotes] = useState(0);

  const handleClickRandom = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
  };

  const voteSelected = () => {
    const newVotes = [...vote];
    newVotes[selected] += 1;
    setVote(newVotes);

    if (newVotes[selected] > vote[votes]) {
      setVotes(selected);
    }
  };

  return (
    <div>
      <h1>Anedotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} vote</p>
      <Button onClick={voteSelected} text="vote" />
      <Button onClick={handleClickRandom} text="next anecdote" />
      <h2>Anedotes whit most votes</h2>
      <div>{anecdotes[votes]}</div>
      <div>has {vote[votes]} votes</div>
    </div>
  );
};

export default App;
