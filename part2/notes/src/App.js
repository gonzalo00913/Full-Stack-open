import { useState, useEffect } from 'react'
import Note from './Components/Notes'
import noteService from './services/notes'
import Notification from './Components/Notification'
import Footer from './Components/Footer'
import './index.css'

const App = () => {
  // Estado para almacenar las notas obtenidas desde el servidor
  const [notes, setNotes] = useState([])
  // Estado para almacenar la nueva nota que se agregará
  const [newNote, setNewNote] = useState('')
  // Estado para indicar si se muestran todas las notas o solo las importantes
  const [showAll, setShowAll] = useState(true)
  // Estado para indicar un mensáje de error
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  // Se llama a la API del servidor para obtener las notas y se almacenan en el estado
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // Función para agregar una nueva nota
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    // Se llama a la API del servidor para crear una nueva nota y se actualiza el estado con la nueva nota
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // Función para manejar el cambio en el valor de la nueva nota
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // Función para cambiar la importancia de una nota
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    // Se llama a la API del servidor para actualizar la nota y se actualiza el estado con la nota actualizada
    noteService
    .update(changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  // Se filtran las notas que se mostrarán según si se muestran todas o solo las importantes
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      {/* Botón para cambiar entre mostrar todas las notas o solo las importantes */}
      <Notification message={errorMessage} /> 
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {/* Se mapean las notas a componentes Note */}
          {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>
      {/* Formulario para agregar una nueva nota */}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
