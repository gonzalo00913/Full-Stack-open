import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)


const initialState = anecdotesAtStart.map((content) => ({
  content,
  id: getId(),
  votes: 0,
}));


const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState,
  reducers:{
    createAnecdote(state, action) {
     state.push(action.payload)
    },
    voteAnecdote(state, action){
      const id = action.payload;
      const anecdoteToVote = state.find((anecdotes) => anecdotes.id === id);
      if(anecdoteToVote){
        anecdoteToVote.votes += 1;
      }
    },

    setAnecdotes(state, action){
      return action.payload
    }

  }


})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;