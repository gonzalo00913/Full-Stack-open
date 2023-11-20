import { useState } from "react";

const CreateNew = (props) => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [info, setInfo] = useState("");
    const [notification, setNotification] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.addNew({
        content,
        author,
        info,
        votes: 0,
      });
      showNotification(`New anecdote created ${content}`)
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
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            author
            <input
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            url for more info
            <input
              name="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  };

export default CreateNew;