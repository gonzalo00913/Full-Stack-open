import Togglable from "./Togglable";

const Blog = ({blog, handleLike}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  
  };
  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <Togglable buttonLabel="view">
          <p>{blog.url}</p>
          <p>Likes:{blog.likes}</p>
          <button onClick={() => handleLike(blog)}>Like</button>
          <p>{blog.author}</p>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
