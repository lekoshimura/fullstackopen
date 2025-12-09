import { useState } from "react";

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positivePct, setPositivePct] = useState(0);

  const updateAll = () => {
    const _all = all + 1;
    setAll(all + 1);
    return _all;
  };

  const updateAverage = (good, bad, all) => {
    setAverage((good - bad) / all);
  };

  const updatePositive = (good, all) => {
    setPositivePct(good / all);
  };

  const handleSetGood = () => {
    const _good = good + 1;
    setGood(_good);
    const _all = updateAll();
    updateAverage(_good, bad, _all);
    updatePositive(_good, all);
  };

  const handleSetNeutral = () => {
    setNeutral(neutral + 1);
    const _all = updateAll();
    updateAverage(good, bad, _all);
    updatePositive(good, _all);
  };

  const handleSetBad = () => {
    const _bad = bad + 1;
    setBad(_bad);
    const _all = updateAll();
    updateAverage(good, _bad, _all);
    updatePositive(good, _all);
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
        <div>
          <h1>Statistics</h1>
          <ul>
            <li>good: {good}</li>
            <li>neutral: {neutral}</li>
            <li>bad: {bad}</li>
            <li>all: {all}</li>
            <li>average: {average.toLocaleString()}</li>
            <li>positive: {(positivePct * 100).toLocaleString()} %</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
