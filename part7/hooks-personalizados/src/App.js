import useCounter from "./hooks";

function App() {
  const counterHook = useCounter();

  return (
    <div className="App">
      <div>{counterHook.value}</div>
      <button onClick={counterHook.increase}>plus</button>
      <button onClick={counterHook.decrease}>minus</button>
      <button onClick={counterHook.zero}>zero</button>
    </div>
  );
}

export default App;
