import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
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
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
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
    window.localStorage.removeItem("loggedNoteappUser");
    blogService.setToken(null);
    setUser(null);
    showNotification("Logged out successfully");
  };

  const handleLike = async (blog) => {
    const updatedLikes = blog.likes + 1;
    try {
      const updatedBlog = await blogService.updateLikes(blog.id, updatedLikes);
     
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );
    } catch (error) {
      console.error("Error al actualizar los likes:", error);
    }
  };

  const handleDeleteBlog = async (blogToDelete) => {
    if (window.confirm(`Do you really want to remove the blog "${blogToDelete.title}"?`)) {
      console.log("que ondaaa", blogToDelete.title);
      try {
        await blogService.deleteBlog(blogToDelete.id);
  
        // Actualiza la lista de blogs eliminando el blog
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete.id));
        showNotification(`Blog "${blogToDelete.title}" has been deleted.`);
      } catch (error) {
        console.error("Error deleting the blog:", error);
        setErrorMessage("Failed to delete the blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };
  

  const sortedBlogs = [...blogs];
  sortedBlogs.sort((a, b) => b.likes - a.likes);
  

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
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={() => handleDeleteBlog(blog)}/>
          ))}
        </div>
      ) : (
        <div>
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={(e) => setUsername(e.target.value)}
              handlePasswordChange={(e) => setPassword(e.target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>
      )}
    </div>
  );
}

export default App;
