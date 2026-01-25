import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+12 34 5678-9012" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
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
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitForm}>
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
        {persons.map((person) => (
          <li key={person.name}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
