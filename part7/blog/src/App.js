import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setNotification,clearNotification } from "./reducers/notificationSlice";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { initializeBlog } from "./reducers/blogSlice";
import { loginUser, logoutUser } from "./reducers/loginSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const errorMessage = useSelector((state) => state.login.error);

  useEffect(() => {
    dispatch(initializeBlog());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  
  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    blogService.setToken(null);
    dispatch(logoutUser());
    showNotification("Logged out successfully");
  };

 /*   const sortedBlogs = [...blogs];
  sortedBlogs.sort((a, b) => b.likes - a.likes); */

  const showNotification = (message) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user ? (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <Blog />
        </div>
      ) : (
        <div>
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        </div>
      )}
    </div>
  );
}

export default App;
