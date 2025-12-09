import { useState } from "react";

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const total = good + neutral + bad;

  const updateAverage = () => {
    return total ? ((good - bad) / total).toFixed(2) : 0;
  };

  const updatePositive = () => {
    return total ? (good / total).toFixed(2) : 0;
  };

  if (total) {
    return (
      <div>
        <h1>Statistics</h1>
        <ul>
          <li>good: {good}</li>
          <li>neutral: {neutral}</li>
          <li>bad: {bad}</li>
          <li>all: {total}</li>
          <li>average: {updateAverage()}</li>
          <li>positive: {updatePositive()} %</li>
        </ul>
      </div>
    );
  } else {
    return <div><p>No feedback given.</p></div>;
  }
};

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSetGood = () => {
    setGood(good + 1);
  };

  const handleSetNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleSetBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Unicafe</h1>
      <div>
        <h1>Give feedback</h1>
        <div>
          <button onClick={handleSetGood}>good</button>
          <button onClick={handleSetNeutral}>neutral</button>
          <button onClick={handleSetBad}>bad</button>
        </div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};
