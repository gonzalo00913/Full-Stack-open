import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = anecdotesAtStart.map((content) => ({
  content,
  id: getId(),
  votes: 0,
}));

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdotes) => anecdotes.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }

      anecdoteService.voteAnecdote(id, anecdoteToVote.votes)
    },

    setAnecdotes(state, action) {
      return action.payload;
    },

    AppendAnecdote(state, action) {
      state.push(action.payload)
    }
  },
});

export const {voteAnecdote, setAnecdotes, AppendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) =>{
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(AppendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer;
