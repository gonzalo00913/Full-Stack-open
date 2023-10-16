import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    };

    blogService.create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setTitle("");
        setAuthor("");
        setUrl("");
        setLikes(0);
        showNotification(`New blog added: ${returnedBlog.title}`);
      })
      .catch((error) => {
        setErrorMessage("Failed to add a new blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      showNotification("Login successful");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    setUser(null);
    showNotification("Logged out successfully");
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <Notification message={errorMessage} />
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <form onSubmit={addBlog}>
            <div>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              Author:
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
              Url:
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div>
              Likes:
              <input type="text" value={likes} onChange={(e) => setLikes(e.target.value)} />
            </div>
            <button type="submit">Save</button>
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username:
              <input
                type="text"
                value={username}
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                value={password}
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

