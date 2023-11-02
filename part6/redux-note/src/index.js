import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.data)
  }

  return state
}


const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const App = () => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {store.getState().map((note) => {
          return <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>;
        })}
      </ul>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
