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

- *Objects are not valid as a React child*: individual things rendered in braces must be primitive values, such as numbers or strings.

```jsx
<p>{person}</p> // Wrong
<p>{person.name}</p> // Correct
```
