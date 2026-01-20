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
note => note.id
```

The full form would be:

```jsx
(note) => {
  return note.id
}
```

In React, we often use `map` to render a collection of items as a list of components.

```jsx
notes.map(note =>
  <li key={note.id}>
    {note.content}
  </li>
)
```

- React requires a special `key` property to be set on each list item. This helps React identify which items have changed.
- The value of the variable must be rendered inside curly braces.

### Anti-pattern: Array Indexes as Keys

The following code is not recommended:

```jsx
<ul>
  {notes.map((note, i) => 
    <li key={i}>
      {note.content}
    </li>
  )}
</ul>
```

Using array indexes as keys can lead to issues when the list changes, such as when items are added, removed, or reordered. This can cause React to incorrectly associate components with data, leading to unexpected behavior and rendering issues.
