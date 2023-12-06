import AuthorBirthYearForm from "./AuthorBirthYearForm";

const Authors = ({ authors, show }) => {
  if (!show) {
    return null;
  }

  if (!authors) {
    return <div>No authors available</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirthYearForm/>
    </div>
  );
};

export default Authors;
