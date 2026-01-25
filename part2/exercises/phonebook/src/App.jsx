import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const onNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onFilterInputChange = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    filter.length === 0
      ? setFilteredPersons(persons)
      : setFilteredPersons(
          // filter case insensitively:
          persons.filter((person) =>
            person.name.toUpperCase().includes(filter.toUpperCase()),
          ),
        );
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    // If name already exists, show alert and do not add:
    const existingPersonIndex = persons.findIndex(
      (person) => person.name === newName,
    );
    if (existingPersonIndex !== -1) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // Add new person to phonebook:
    const person = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(person));
    setFilteredPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <h2>Filter shown with:</h2>
        <input type="text" value={filter} onChange={onFilterInputChange} />
      </div>
      <form onSubmit={onSubmitForm}>
        <h2>Add new</h2>
        <div>
          <span style={{ width: "100px", display: "inline-block" }}>name:</span>
          <input value={newName} onChange={onNameInputChange} />
        </div>
        <div>
          <span style={{ width: "100px", display: "inline-block" }}>
            number:
          </span>
          <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <span style={{ width: "100px", display: "inline-block" }}>
            &nbsp;
          </span>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
