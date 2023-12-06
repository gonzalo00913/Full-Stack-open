import { useQuery,useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";

const AuthorBirthYearForm = () => {
    const [authorName, setAuthorName] = useState("")
    const [birthYear, setBirthYear] = useState("")
    const {data} = useQuery(ALL_AUTHORS);
    const [editAuthor] = useMutation(EDIT_AUTHOR)

    const handleSetBirthYear = async (e) =>{
        e.preventDefault();
        await editAuthor({
            variables: { name: authorName, setBornTo: Number(birthYear) },
            refetchQueries: [{ query: ALL_AUTHORS }],
        })
        setAuthorName('');
        setBirthYear('');
    }

  return (
    <div>
       <h2>Set BirthYear</h2>
       <form onSubmit={handleSetBirthYear}>
         <select value={authorName} onChange={(e) => setAuthorName(e.target.value)}>
         {data.allAuthors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
         </select>
         <input
          type="number"
          placeholder="Enter birth year"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        />
        <button type="submit">Set Birth Year</button>
       </form>
    </div>
  )
}

export default AuthorBirthYearForm