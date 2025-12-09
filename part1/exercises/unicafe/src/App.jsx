import { useState } from "react";

const StatisticLine = (props) => {
  const { value, text } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const total = good + neutral + bad;

  const updateAverage = () => {
    return total ? ((good - bad) / total).toFixed(2) : 0;
  };

  const updatePositive = () => {
    return total ? (good / total).toFixed(2).concat("%") : 0;
  };

  if (total) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine value={good} text="good" />
            <StatisticLine value={neutral} text="neutral" />
            <StatisticLine value={bad} text="bad" />
            <StatisticLine value={total} text="total" />
            <StatisticLine value={updateAverage()} text="average" />
            <StatisticLine value={updatePositive()} text="positive feedback" />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    );
  }
};

const Button = (props) => {
  const { onClick, label } = props;
  return <button onClick={onClick}>{label}</button>;
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
          <Button onClick={handleSetGood} label="good"></Button>
          <Button onClick={handleSetNeutral} label="neutral"></Button>
          <Button onClick={handleSetBad} label="bad"></Button>
        </div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};
