import { useState } from "react";

const History = (props) => {
  console.log('props value is: ', props);
  return props.allClicks.length ? (
    <div>button press history: {props.allClicks.join(" ")}</div>
  ) : (
    <div>the app is used by pressing the buttons</div>
  );
};

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [total, setTotal] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setTotal(clicks.left + clicks.right + 1);
    setAll(allClicks.concat("L"));
    setClicks({ ...clicks, left: clicks.left + 1 });
  };

  const handleRightClick = () => {
    setTotal(clicks.left + clicks.right + 1);
    setAll(allClicks.concat("R"));
    setClicks({ ...clicks, right: clicks.right + 1 });
  };

  return (
    <>
      <div>
        {clicks.left}
        <Button onClick={handleLeftClick} text='left'></Button>
        <Button onClick={handleRightClick} text='right'></Button>
        {clicks.right}
      </div>
      <div>total clicks: {total}</div>
      <div>
        <History allClicks={allClicks} />
      </div>
    </>
  );
};

export default App;
