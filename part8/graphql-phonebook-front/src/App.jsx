import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import { ALL_PERSONS } from './queries';

function App() {
  const result = useQuery(ALL_PERSONS)


  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons}/>
      <PersonsForm/>
    </div>
  )
}

export default App
