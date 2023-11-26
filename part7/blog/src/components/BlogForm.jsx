import React from "react";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes(0);
    /* showNotification(`New blog added: ${returnedBlog.title}`); */
  };

  return (
    <div>
      <form className="blog-form" onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          Likes:
          <input
            type="text"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
