import { useState } from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const [notification, setNotification] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    content.onReset();
    author.onReset();
    info.onReset();
    showNotification(`New anecdote created ${content.value}`);
  };

  const handleReset = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      {notification}
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
