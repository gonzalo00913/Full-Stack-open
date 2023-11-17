import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, voteAnecdote } from "./server";

const App = () => {
  const queryClient = useQueryClient();

  const updateVoteMutation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdote") || [];
      const updatedAnecdotes = anecdotes.map((anecdote) => {
        return anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote;
      });
      queryClient.setQueryData("anecdote", updatedAnecdotes);
    },
  });

  const handleVote = (id, votes) => {
    updateVoteMutation.mutate({ id, votes: votes + 1 });
  };

  //
  const result = useQuery("anecdote", getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Error: Failed to fetch data from the server</div>;
  }

  const anecdotes = result.data || [];
  //

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.votes)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
