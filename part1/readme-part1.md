# Part 1: React

- <https://fullstackopen.com/en/part1>

## A - Introduction to React

### Preparing the environment

Install nvm and use it to install Node.js version 22.21.1 (LTS) as follows:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
$ export NVM_DIR="$HOME/.nvm"
$ [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
$ [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
$ command -v nvm
nvm
$ nvm install v22.21.1
$ node --version
v22.21.1
$ npm --version
10.9.4
```

Create a React application with Vite. Answer the prompts as follows:

```bash
$ npm create vite@latest
> npx
> create-vite
│
◇  Project name:
│  part1
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  No
│
◇  Scaffolding project in /mnt/d/Work/fullstackopen.com/part1...
│
└  Done. Now run:

  cd part1
  npm install
  npm run dev
```

For the purpose of this course, we will clean up the project a bit. Remove the following files and folders:

```bash
$ rm ./README.md
$ rm ./src/App.css
$ rm ./src/assets/
$ rm ./src/index.css
$ rm ./public/
```

Let's configure the project manually for learning purposes:

```bash
$ cd part1
$ npm install
$ npm run dev
```

Go to <http://localhost:5173/>.

### Component

A minimal React component using arrow function syntax:

```jsx
const App = () => (
  <div>
    <p>Hello world!</p>
  </div>
);
export default App;
```

This is an **arrow function** declaration. The component `App` is defined as a constant that holds an arrow function. The parentheses around the JSX indicate an implicit return - the function returns the JSX element without needing an explicit `return` statement.

### JSX

- It allows writing HTML-like code within JavaScript.
- It looks like regular HTML, but has the advantages of inlining dynamic content.
- Babel transpiles JSX into JavaScript function calls. Example:

```jsx
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
);
```

is transpiled to:

```jsx
const App = () =>
  React.createElement(
    "div",
    null,
    React.createElement("p", null, "Hello world"),
  );
```

### Multiple components

- React components can be composed of other components.
- An `App` component is typically the root component.

### props: passing data to components

```jsx
const Hello = (props) => (
  <div>
    <p>Hello {props.name}</p>
  </div>
);
const App = () => (
  <div>
    <Hello name="Peter" />
  </div>
);
```

### Some notes

- Use capitalized names for components.
- A component must (usually) return a single element. Use a `<div>` or React fragments (`<></>`) to wrap multiple elements.
- Use `className` instead of `class` for CSS classes.

### Do not render objects

- _Objects are not valid as a React child_: individual things rendered in braces must be primitive values, such as numbers or strings.

```jsx
<p>{person}</p> // Wrong
<p>{person.name}</p> // Correct
```

## B - JavaScript

JavaScript (ECMAScript) features may not be fully supported in browsers, so code is often transpiled using tools like [Babel](https://babeljs.io) for compatibility. [Node.js](https://v8.dev/) enables JavaScript execution outside browsers for server-side development.

### Variables

```js
// "const" defines a value that cannot be changed
const x = 1;

// "let" defines a variable that can be changed
let y = 5;

console.log(x, y); // 1 5 are printed
y += 10;
console.log(x, y); // 1 15 are printed
y = "sometext";
console.log(x, y); // 1 sometext are printed
x = 4; // causes an error
```

Throughout the course, we will avoid using `var`, which is the old way to define variables in JavaScript (before ES6). Main differences between `var` and `let`/`const` relate to variable scope and hoisting:

- **Scope**: `var` is function-scoped, while `let` and `const` are block-scoped. This means that variables declared with `let` or `const` are only accessible within the block they are defined in (e.g., inside a loop or an if statement), whereas `var` is accessible throughout the entire function.

- **Hoisting**: Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`, while `let` and `const` are also hoisted but not initialized. Accessing them before their declaration results in a `ReferenceError`.

### Arrays

Although array `t` is defined using `const`, its contents can still be modified with methods like `push`. In functional programming, it's preferable to use immutable data structures.

```js
const t = [1, -1, 3];
t.push(5);
t.forEach((value) => console.log(value));
// 1, -1, 3 and 5 are printed
```

To create a new array with added items, keeping the original array _unchanged_, use `concat`:

```js
const t2 = t.concat(10);
console.log(t2); // [1, -1, 3, 5, 10]
console.log(t); // [1, -1, 3, 5]
```

`map`, _creates a new array_ by transforming each element of the original array:

```js
const t3 = t.map((value) => value * 2);
console.log(t3); // [2, -2, 6, 10]
```

Use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) to easily assign individual items of an array to variables.

```js
const t = [1, -1, 3];
const [first, second, third] = t;
console.log(first); // 1
console.log(second); // -1
console.log(third); // 3
```

### Objects

Declaring objects with object literals method:

```js
const object1 = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
};
console.log(object1.name); // dot notation
console.log(object1["age"]); // bracket notation
```

JavaScript does not have classes in the same sense as object-oriented programming languages like Java or C++. Instead, it uses prototypes for inheritance.

### Functions

Defining functions with arrow function syntax:

```js
// This way:
const sum = (p1, p2) => {
  return p1 + p2;
};

// or this way:
const sum = (p1, p2) => p1 + p2;
```

The second form is a more concise syntax for functions that consist of a single expression. The value of that expression is implicitly returned. This is handy for `map` and similar methods:

```js
const t = [1, -1, 3];
const t2 = t.map((value) => value * 2);
console.log(t2); // [2, -2, 6]
```

Other ways to define functions:

```js
// Function declaration
function sum(p1, p2) {
  return p1 + p2;
}
// Function expression
const sum = function (p1, p2) {
  return p1 + p2;
};
```

## C - Component state, event handlers

### Component helper functions

A function can be defined within a component (which is another function itself):

```jsx
const App = () => {
  const now = new Date();
  const getHour = () => {
    return now.getHours();
  };

  return (
    <div>
      <p>Current hour is {getHour()}</p>
    </div>
  );
};
```

### Destructuring

With destructuring, the `Hello` component...:

```jsx
const Hello = (props) => {
  const name = props.name;
  const age = props.age;
  return <div>// ...</div>;
};
```

...can be rewritten as follows:

```jsx
const Hello = (props) => {
  const { name, age } = props;
  return <div>// ...</div>;
};
```

We can take destructuring a step further by directly destructuring props into variables:

```jsx
const Hello = ({ name, age }) => {
  return <div>// ...</div>;
};
```

### Page re-rendering

Rerendering can be triggeered by calling `ReactDOM.createRoot().render()` again. Though, the code bellow works, this is not the preferred way to update the UI in React applications. In practice, state management (using `useState` or other state management libraries) is used to handle dynamic updates more efficiently.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
const App = () => {
  const now = new Date();
  return (
    <div>
      <p>Current time is {now.toLocaleTimeString()}</p>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
setInterval(() => {
  root.render(<App />);
}, 1000);
```

### Stateful component

Changing the code at _App.jsx_ to use state and `useEffect` hook. In the code below, `useState()` function return two values:

- `counter` state variable, that is initialized to `0`.
- `setCounter()` function, that is used to update the value of `counter`.

Both values are captured using array destructuring:

```jsx
import { useState } from "react";
const App = () => {
  const [counter, setCounter] = useState(0);
  setTimeout(() => setCounter(counter + 1), 1000);
  return <div>{counter}</div>;
};
export default App;
```

When `setCounter()` is called, React knows that the state of the component has changed and triggers a re-rendering of the component. During the re-rendering, the new value of `counter` is used, and thus the displayed value updates every second.

### Event handling

In React, [event handlers](https://react.dev/learn/responding-to-events) are defined as functions within the component and are passed to elements as props. The naming convention for event handlers in React uses camelCase, such as `onClick` for click events.

```jsx
const App = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button>
    </div>
  );
};
```

### An event handler is a function

The following code...:

```jsx
<button onClick={() => setCounter(counter + 1)}>plus</button>
```

... can be rewritten as:

```jsx
<button onClick={setCounter(counter + 1)}>plus</button>
```

### Passing state - to child components

In React, data is typically passed from parent components to child components using props. This is a unidirectional data flow.

Event handlers can also be passed down to child components as props, allowing child components to communicate back to the parent component when certain events occur.

> Calling a function that changes the state causes the component to re-render.

```jsx
const App = () => {
  const [counter, setCounter] = useState(0);
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  );
};
```

See the complete example at [./examples/02-counter/src/App.jsx](./examples/02-counter/src/App.jsx)

## D - A more complex state, debugging React apps

### Complex state

`useState` can be used to manage more complex state, such as objects. When updating the state, ensure to create a new object instead of mutating the existing one, to allow React to detect the change and re-render the component.

```jsx
const App = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1 });
  };
  const handleRightClick = () => {
    setClicks({ ...clicks, right: clicks.right + 1 });
  };
  return (
    <>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </>
  );
};
```

See the complete example at [./examples/03-counter-left-right/src/App.jsx](./examples/03-counter-left-right/src/App.jsx)

### Handling arrays

Likewise objects, when updating arrays in state, create a new array instead of mutating the existing one. Use methods like `concat`, `slice`, or the spread operator to create new arrays.

### Update of the state is asynchronous

State updates in React are asynchronous. This means that when you call a state update function like `setState`, the state change does not happen immediately. Instead, React schedules the update and applies it during the next render cycle.

```jsx
const handleLeftClick = () => {
  console.log("before", total);
  setTotal(clicks.left + clicks.right + 1);
  console.log("after", total);
  setClicks({ ...clicks, left: clicks.left + 1 });
  // "before" and "after" will log the same value
};
```

The result at console will be:

```
before 0
after 0
```

### Conditional rendering

In React, you can conditionally render components or elements based on certain conditions using JavaScript conditional statements...:

```jsx
const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};
```

...or ternary operators within the JSX:

```jsx
const History = (props) => {
  return props.allClicks.length ? (
    <div>button press history: {props.allClicks.join(" ")}</div>
  ) : (
    <div>the app is used by pressing the buttons</div>
  );
};
```

### Old React

Prior to React 16.8.0, React required class components to manage state and lifecycle methods. With the introduction of [State Hooks](https://react.dev/learn/state-a-components-memory) in React 16.8.0, functional components can now manage state and side effects.

### Debugging React applications

Is you use "+" (plus sign) to concatenate strings with objects, the object is converted to a string using its `toString()` method, which results in the string `"[object Object]"`. This is why you see that output when using `console.log('props value is ' + props)`.

```text
console.log('props value is ' + props)
props value is [object Object]
```

Instad, use a comma `,` to separate the string and the object in `console.log()`. This way, the object is logged in its entirety, allowing you to inspect its properties and values.

```text
console.log('props value is', props)
props value is: allClicks: (2) ['R', 'R']
```

It is recommended to [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?pli=1) extension for Chrome and Firefox, which provides an interface to inspect React component hierarchies, state, and props.

### Rules of Hooks

- Don't call Hooks (`useState` and `useEffect`) inside loops, conditions, or nested functions. Always use Hooks at the top level of your React function.

### Do Not Define Components Within Components

It works but is not recommended to define a component inside another component because each time the parent component re-renders, the inner component is redefined, making it impossible to React to optimize rendering. Define components at the top level of your file instead.
