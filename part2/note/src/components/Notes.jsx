import '../App.css';

const Notes = ({ note, toggleImportance,deleteNote }) => {
  const label = note.important ? "not important" : "important";

  return (
    <div className='container-btn-import'>
      <li className="note">{note.content}</li>
      <button className='btn-label' onClick={toggleImportance}>{label}</button>
      <button className="btn-delete" onClick={deleteNote}>Delete</button>
    </div>
  );
};

export default Notes;
