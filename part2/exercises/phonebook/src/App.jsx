import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onInputChange = (event) => {
    setNewName(event.target.value);
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
    };
    setPersons(persons.concat(person));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          name: <input value={newName} onChange={onInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
