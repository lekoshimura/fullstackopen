# Part 2: Communicating with server

## A - Rendering a collection, modules

### JavaScript Arrays

In functional programming, a function is a value that can be passed as arguments to other functions (also called "higher order functions"), returned from other functions, and assigned to other variables.

This favours composition of small functions to build more complex ones.

```js
const animals = [
  { name: "Fluffy", species: "cat" },
  { name: "Tino", species: "cat" },
  { name: "Mishi", species: "cat" },
  { name: "Henry Capaldi", species: "cat" },
  { name: "Fido", species: "dog" },
  { name: "Elvis", species: "dog" },
  { name: "Shiro", species: "dog" },
  { name: "Favelinha", species: "dog" },
  { name: "Goldie", species: "fish" },
  { name: "Cora", species: "fish" },
  { name: "Nemo", species: "fish" },
];
```

### Filtering arrays

`filter` creates a new array with all elements that pass the test implemented by the provided function.

Traditional way with `for` loop:

```js
let dogs = [];
for (let i = 0; i < animals.length; i++) {
  dogs.push(animals[i]);
}
```

Functional way with `filter`:

```js
let dogs = animals.filter((animal) => animal.species === "dog");
```

### Mapping arrays

`map` transforms array's elements.

Traditional way with `for` loop:

```js
let dogNames = [];
for (let i = 0; i < dogs.length; i++) {
  dogNames.push(dogs[i].name + " is a " + dogs[i].species);
}
console.log(dogNames);
// ['Fido is a dog', 'Elvis is a dog', 'Shiro is a dog', 'Favelinha is a dog']
```

Functional way with `map`:

```js
let dogNames = dogs.map((dog) => dog.name + " is a " + dog.species);
console.log(dogNames);
// ['Fido', 'Elvis', 'Shiro', 'Favelinha']
```

### Reducing arrays

```js
var orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 },
];

// At each iteration, "sum" will be the value returned by
// the last execution of the function:
var totalAmount = orders.reduce((sum, order) => {
  return sum + order.amount;
}, 0); // 0, is the initial value of "sum"
console.log(totalAmount);
// 1075
```

### Map

The function is an arrow function written in compact form:

```jsx
(note) => note.id;
```

The full form would be:

```jsx
(note) => {
  return note.id;
};
```

In React, we often use `map` to render a collection of items as a list of components.

```jsx
notes.map((note) => <li key={note.id}>{note.content}</li>);
```

- React requires a special `key` property to be set on each list item. This helps React identify which items have changed.
- The value of the variable must be rendered inside curly braces.

### Anti-pattern: Array Indexes as Keys

The following code is not recommended:

```jsx
<ul>
  {notes.map((note, i) => (
    <li key={i}>{note.content}</li>
  ))}
</ul>
```

Using array indexes as keys can lead to issues when the list changes, such as when items are added, removed, or reordered. This can cause React to incorrectly associate components with data, leading to unexpected behavior and rendering issues.

## B - Forms

### Saving the notes in the component state

Import the `useState` function and use it to define a piece of state that gets initialized with the initial notes array passed in the props.

```jsx
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const addNote = (event) => {
    // Prevent page reload:
    event.preventDefault();

    // Log the element that triggered the event:
    console.log("button clicked", event.target);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
```

### Controlled component

How do we access the data contained in the form's input element?

```jsx
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note");

  const addNote = (event) => {
    // 4 . Prevent page reload:
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    // 3 . array.concat() creates a new array containing the contents
    // of the old array and the new element:
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  // 2 . We have to register an event handler that synchronizes the
  // changes made to the input with the component's state. Otherwise,
  // the input field would be read-only and we'll see a warning in
  // the console:
  const handleNewNote = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        {/* 1 . A piece of the App component's state is assigned as the value
            attribute of the input element, the App component now controls the
            behavior of the input element:
        */}
        <input value={newNote} onChange={handleNewNote} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
```

### Filtering Displayed Elements

```jsx
const App = (props) => {
  const [showAll, setShowAll] = useState(true);
  // ...
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  return (
    // ...
    <button onClick={() => setShowAll(!showAll)}>
      show {showAll ? "important" : "all"}
    </button>
    // ...
    notesToShow.map((note) => <li key={note.id}>{note.content}</li>
  );
};
```

See complete example at:

- `part2/examples/notes/`

## C - Getting data from server

The db.json file was created at the root of the notes project to simulate a backend server. Start the JSON Server with the following command:

```bash
npx json-server --port 3001 db.json
```

You can see the data at `http://localhost:3001/notes`. The React code fetches the notes from the server and renders them to the screen. Whenever a new note is added to the application, the React code also sends it to the server to make the new note persist in "memory". In the next lesson, we will see how to make the data persist permanently.

### The browser as a runtime environment

To fetch data in the old way, we would use the `XMLHttpRequest` API.

```js
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    // handle the response that is saved in variable data
  }
};
xhttp.open("GET", "/data.json", true);
xhttp.send();
```

`XMLHttpRequest` (also known as HTTP request) is a technique introduced in 1999. It is no longer recommended to use it, and it has been largely superseded by `fetch`.

Nowadays, we can use the more modern `fetch` API that is built into most browsers.

### npm

#### JSON Server

```bash
$ npm install json-server --save-dev
# json-server was installed as a development dependency because it is only needed
# during development to simulate a backend server.
```

Add the following script to `package.json` to start the JSON server more easily:

```
"server": "json-server -p 3001 db.json"
```

#### Axios

```bash
$ npm install axios
# Notice that in `package.json`, a new section `dependencies` has been added:
# axios is installed as a runtime dependency. There is no --save-dev flag.
```

Axios returns promises. A promise can have three states:

- pending
- fulfilled
- rejected

. When the promise is fulfilled, we can access the data returned by the server.

### Effect-hooks

React 16.8.0 introduced hooks, which allow us to use state and other React features without writing a class:

- useState: allows us to add state to function components.
- effect-hooks: allows us to perform side effects in function components.

When fetching data from a server, we are performing a side effect. Therefore, we use the `useEffect` hook to fetch data from the server when the component is rendered for the first time.

```jsx
const App = () => {
  const hook = () => {
    // 2 . Effect function is executed, data is fetched
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      // 3 . When data is fetched, state is updated, component re-renders
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  };

  useEffect(hook, []);
  // 1 . First render, notes: 0 notes
  // 4 . Second render, notes: 3 notes
  console.log("render", notes.length, "notes");
  // ...
};
```

- The first argument to `useEffect` is the function that contains the side-effect logic.
- The second argument is an array of dependencies. Since we want the effect to run only once, when the component is first rendered, we pass an empty array.
- If we omit the second argument, the effect will run after every render, which is not what we want when fetching data from a server.
- The code above is executed only once, after the first render of the component.

## D - Altering data in server

The **json-server** package claims to be a so-called REST or RESTful API in its documentation:

> Get a full fake REST API with zero coding in less than 30 seconds (seriously)

### REST

REST stands for REpresentational State Transfer. It is an architectural style for designing networked applications ("aplicação distribuída"). A RESTful API is an API that adheres to the principles of REST.

Individual items backend can be modified on the server in two different ways:

- HTTP PUT request: replace the entire note
- HTTP PATCH request: only change some of the note's properties.

### Sending Data to the Server

Use `axios.post()` to send data to the server.

```jsx
const addNote = (event) => {
  event.preventDefault();
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    // id: [any unique value], -> omit because id will be generated by the server
  };

  axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    setNotes(notes.concat(response.data));
    setNewNote("");
  });
};
```

### Changing the Importance of Notes

```jsx
const toggleImportanceOf = (id) => {
  // - Use find() instead of filter() - More efficient for finding a
  //   single item; no need to access [0].
  const note = notes.find((n) => n.id === id);

  if (!note) {
    console.error("Note not found");
    return;
  }

  // - Create a new object with the updated important property.
  // - In React, never mutate state directly. Always create a new copy of the
  // state and update the copy. This is because React relies on immutability to
  // detect changes in state and re-render components efficiently.
  // - Don't do "note.important = !note.important".
  // - changedNote is "shallow copy": it means a copy field by field.
  const updatedNote = { ...note, important: !note.important };

  axios
    .put(`http://localhost:3001/notes/${id}`, updatedNote)
    .then((response) => {
      // Array.map() creates a new array by transforming each element
      // of the original array. We will be using this method many times
      // throughout the course.
      setNotes(notes.map((n) => (n.id === id ? response.data : n)));
    });
};
```

### Extracting Communication with the Backend into a Separate Module

- Recap: How to start the notes example

```powershell
> cd .\part2\examples\notes\
> npx json-server --port 3001 db.json
> npm run dev
```

Adopting the "[Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)" from SOLID principles, we can extract the communication with the backend into a separate module:

- 1 . Create a new folder `services` inside the `src` folder. Inside the `services` folder, create a new file `notes.js` with the content as in `part2/examples/notes/src/services/notes.js`.
- 2 . Update the `App.jsx` file to use the new `noteService` module, as shown in `part2/examples/notes/src/App.jsx`.
- 2.1 . Import with:

```jsx
import noteService from "./services/notes";
```

- 2.2 . Adapt the existing code from this:

```jsx
useEffect(() => {
  axios.get("http://localhost:3001/notes").then((response) => {
    setNotes(response.data);
  });
}, []);
```

to this:

```jsx
useEffect(() => {
  noteService.getAll().then((response) => {
    setNotes(response.data);
  });
}, []);
```

- 2.3 . Adapt the existing code from this:

```jsx
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
```

Notice that `getAll()` keeps returning a promise since `request.then(...)` is a promise.

### Cleaner Syntax for Defining Object Literals

The following code:

```js
export default {
  getAll: getAll,
  create: create,
  update: update,
};
```

can be rewritten in a cleaner way as:

```js
export default { getAll, create, update };
```

### Promises and Errors

The catch method can be used to define a handler function at the end of a promise chain, which is called once any promise in the chain throws an error and the promise becomes rejected.

```jsx
const toggleImportanceOf = (id) => {
  // some code omitted for brevity
  const changedNote = { ...note, important: !note.important };
  noteService
    .update(id, changedNote)
    .then((returnedNote) => {
      setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
    })
    .catch((error) => {
      console.error("Failed to update note:", error);
      alert(`the note '${note.content}' was already deleted from server`);
      setNotes(notes.filter((n) => n.id !== id));
    });
};
```
