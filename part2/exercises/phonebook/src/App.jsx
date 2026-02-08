import { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <div>
      <h2>Filter shown with:</h2>
      <input
        type="text"
        value={props.filter}
        onChange={props.onFilterInputChange}
      />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmitForm}>
      <div>
        <span style={{ width: "100px", display: "inline-block" }}>name:</span>
        <input value={props.newName} onChange={props.onNameInputChange} />
      </div>
      <div>
        <span style={{ width: "100px", display: "inline-block" }}>number:</span>
        <input value={props.newNumber} onChange={props.onNumberChange} />
      </div>
      <div>
        <span style={{ width: "100px", display: "inline-block" }}>&nbsp;</span>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <ul>
      {props.filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name}: {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  // Start local server before running frontend:
  // $ npx json-server --port 3001 persons.json
  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  };
  useEffect(hook, []);

  const [persons, setPersons] = useState([]);
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
    axios.post("http://localhost:3001/persons", person).then((response) => {
      setPersons(persons.concat(response.data));
      setFilteredPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onFilterInputChange={onFilterInputChange} />

      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        onNameInputChange={onNameInputChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
        onSubmitForm={onSubmitForm}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
