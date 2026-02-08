import { useState, useEffect } from "react";
import personService from "./services/persons";
import persons from "./services/persons";

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
    <ul style={{ listStyleType: "circle", padding: 0 }}>
      {props.filteredPersons.map((person) => (
        <li
          key={person.id}
          style={{
            padding: "0.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "380px",
          }}
        >
          <span>
            {person.name}: {person.number}
          </span>
          <button onClick={() => props.onDeleteClick(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  // Start local server before running frontend:
  // $ npx json-server --port 3001 persons.json
  const hook = () => {
    personService.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
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

    const existingPersonIndex = persons.findIndex(
      (person) => person.name === newName,
    );
    // If name already exists, show alert and ask it user should be updated:
    if (existingPersonIndex !== -1) {
      if (!confirm(`Update ${newName} phone number to ${newNumber}?`)) return;
      const person = persons[existingPersonIndex];
      person.number = newNumber;
      personService.update(person).then((updatedPerson) => {
        persons.map((p) => {
          if (p.id === updatedPerson.id) p = { updatedPerson };
        });
        setPersons([...persons]);
        setFilteredPersons([...persons]);
      });
    } else {
      // Add new person to phonebook:
      const person = {
        name: newName,
        number: newNumber,
      };
      personService.create(person).then((personAdded) => {
        setPersons(persons.concat(personAdded));
        setFilteredPersons(persons.concat(personAdded));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const onDeleteClick = (person) => {
    if (confirm(`Delete ${person.name}?`) === false) return;
    const response = personService.remove(person);
    response.then((deletedPerson) => {
      const updatedArray = persons.filter((p) => p.id !== deletedPerson.id);
      setPersons([...updatedArray]);
      setFilteredPersons([...updatedArray]);
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
      <Persons
        filteredPersons={filteredPersons}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
};

export default App;
