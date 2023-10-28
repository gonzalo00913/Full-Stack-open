import Togglable from "./Togglable";

const Blog = ({blog, handleLike, handleDeleteBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  
  };
  return (
    <div style={blogStyle} className="blog">
      <div>
        <div className="blog">
        <span>{blog.title}</span>
        <p>{blog.author}</p>
        </div>
        <Togglable buttonLabel="view">
          <p>{blog.url}</p>
          <p>Likes:{blog.likes}</p>
          <button onClick={() => handleLike(blog)}>Like</button>
     
        </Togglable>
        <button onClick={handleDeleteBlog}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
