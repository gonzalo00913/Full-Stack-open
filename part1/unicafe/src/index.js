import ReactDOM from "react-dom";
import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given yet.</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good:" value={good} />
          <StatisticLine text="Neutral:" value={neutral} />
          <StatisticLine text="Bad:" value={bad} />
          <StatisticLine text="Total:" value={total} />
          <StatisticLine text="Average:" value={average.toFixed(1)} />
          <StatisticLine text="Positive:" value={`${positive.toFixed(1)}%`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood(good + 1);
  const handleClickNeutral = () => setNeutral(neutral + 1);
  const handleClickBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleClickGood} text="Good" />
      <Button handleClick={handleClickNeutral} text="Neutral" />
      <Button handleClick={handleClickBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
