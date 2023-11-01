import './App.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const count = useSelector(state => state);

  const dispatch = useDispatch();

  return (
    <div className='App'>
      <div>{count}</div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>plus</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>minus</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  );
};

export default App;
