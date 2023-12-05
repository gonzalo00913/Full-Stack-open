import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import { ALL_PERSONS } from './queries';

function App() {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
    <Notify errorMessage={errorMessage} />
    <Persons persons = {result.data.allPersons} />
    <PersonsForm setError={notify} />
  </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}
export default App
