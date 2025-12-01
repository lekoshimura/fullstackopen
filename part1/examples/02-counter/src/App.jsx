import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  setTimeout(() => setCounter(counter + 1), 500);
  
  return (
    <>
      <p>counter: {counter}</p>
    </>
  );
};

export default App;
