import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const createAnecdote = async (newAnecdote) => {
  const object = { newAnecdote, votes: 0 };
  const res = await axios.post(baseUrl, object);
  return res.data;
};

export const voteAnecdote = async ({ id, votes }) => {
  const res = await axios.patch(`${baseUrl}/${id}`, { votes });
  return res.data;
};
