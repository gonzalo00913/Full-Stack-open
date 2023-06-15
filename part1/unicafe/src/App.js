import { useState } from "react";
import Display from "./components/Display";
import Button from "./components/Button";
import Total from "./components/Total";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodButton = () => {
    setGood(good + 1);
  };

  const handleNeutralButton = () => {
    setNeutral(neutral + 1);
  };

  const handleBadButton = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Display title="give feedback" />
      <Button onClick={handleGoodButton} text="good" />
      <Button onClick={handleNeutralButton} text="neutral" />
      <Button onClick={handleBadButton} text="bad" />
      <Display title="statistics" />
      <Total good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
