import "./App.css";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
  }, [])

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog,
      author: newBlog,
      url: newBlog,
      likes: newBlog,
    };


    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog("");
    });
  };

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({username, password,});
      console.log('User:', user);
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("wrong credentials");
      console.error("Error:", error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {/*  {user === null && loginForm()} */}

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input type="text" value={newBlog} onChange={handleBlogChange}/>
        </div>
        <div>
          Author:
          <input type="text" value={newBlog} onChange={handleBlogChange}/>
        </div>
        <div>
          Url:
          <input type="text" value={newBlog} onChange={handleBlogChange}/>
        </div>
        <div>
          likes:
          <input type="text" value={newBlog} onChange={handleBlogChange}/>
        </div>
        <button type="submit">save</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
