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

Let's configure the project manually for learning purposes:

```bash
$ cd part1
$ npm install
$ npm run dev
```

Go to <http://localhost:5173/>.

### Component

A minimal React component:

```jsx
const App = () => (
  <div>
    <p>Hello world!</p>
  </div>
);
export default App;
```

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
    React.createElement("p", null, "Hello world")
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

To create a new array with added items, keeping the original array *unchanged*, use `concat`:

```js
const t2 = t.concat(10);
console.log(t2); // [1, -1, 3, 5, 10]
console.log(t);  // [1, -1, 3, 5]
```

`map`, *creates a new array* by transforming each element of the original array:

```js
const t3 = t.map(value => value * 2);
console.log(t3); // [2, -2, 6, 10]
```

Use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) to easily assign individual items of an array to variables.

```js
const t = [1, -1, 3];
const [first, second, third] = t;
console.log(first);  // 1
console.log(second); // -1  
console.log(third);  // 3
```

### Objects

Declaring objects with object literals method:

```js
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}
console.log(object1.name); // dot notation
console.log(object1['age']); // bracket notation
```

JavaScript does not have classes in the same sense as object-oriented programming languages like Java or C++. Instead, it uses prototypes for inheritance.

### Functions

Defining functions with arrow function syntax:

```js
// This way:
const sum = (p1, p2) => {
  return p1 + p2;
}

// or this way:
const sum = (p1, p2) => p1 + p2;
```

The second form is a more concise syntax for functions that consist of a single expression. The value of that expression is implicitly returned. This is handy for `map` and similar methods:

```js
const t = [1, -1, 3];
const t2 = t.map(value => value * 2);
console.log(t2); // [2, -2, 6]
```

Other ways to define functions:

```js
// Function declaration
function sum(p1, p2) {
  return p1 + p2;
}
// Function expression
const sum = function(p1, p2) {
  return p1 + p2;
}
```

