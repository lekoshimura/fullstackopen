# 1.6: unicafe step 1

Like most companies, the student restaurant of the University of Helsinki Unicafe collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.

The application must display the total number of collected feedback for each category. Your final application could look like this:

![unicafe step 1](./imgs/ex-1.6-img-01.png)

Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

It is advisable to use the same structure that is used in the material and previous exercise. File *main.jsx* is as follows:

```jsx
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

You can use the code below as a starting point for the App.jsx file:

```jsx
import { useState } from 'react'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}
export default App
```

In above code, three state variables are defined for storing the number of received feedback for each category. The initial value for each variable is set to zero.

- `good` is the variable that stores the number of good feedback received.
- `setGood` is the function that is used for updating the value of the `good` variable.

So, to increase the value of `good` by one, you would call the function `setGood` like this: 

```jsx
setGood(good + 1)
```
