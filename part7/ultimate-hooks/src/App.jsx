import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Hook 
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () =>{
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
  }

  const create = async (newObject) => {
    try {
      const response = await axios.post(baseUrl, newObject);
      setResources([...resources, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating resource:', error);
      return null;
    }
  }

 
  return [resources, { getAll, create }];
}

//

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    noteService.getAll()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    personService.getAll()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App