import './App.css';
import Notes from './components/Notes';
import { useState,useEffect } from 'react';
import noteServices from "../src/services/notes"
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNotes] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteServices
       .getAll()
       .then(response => {
       setNotes(response.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNotes,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteServices
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNotes('')
    })
  }

  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNotes(event.target.value)
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
      
      noteServices
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      }).catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
    }

  return (
    <div>
     <h1>Notes</h1>
     <Notification message={errorMessage} />
     <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note => (
            <Notes key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
            
          ))
        }
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNotes}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
        <Footer/>
    </div>
  );
}

export default App;
