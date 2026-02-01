import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);

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

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNewNote = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "only important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNote} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
