import Togglable from "./Togglable";
import { useSelector } from 'react-redux';

const Blog = ({ handleLike, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogs = useSelector((state) => state.blog); 

  return (
    <div>
      {blogs.map((blog) => ( 
        <div key={blog.id} style={blogStyle} className="blog">
          <div>
            <div className="blog">
              <span>{blog.title}</span>
              <p>{blog.author}</p>
            </div>
            <Togglable buttonLabel="view">
              <p className="blog-url">{blog.url}</p>
              <p className="blog-likes">Likes:{blog.likes}</p>
              <button onClick={() => handleLike(blog)}>Like</button>
            </Togglable>
            <button onClick={() => handleDeleteBlog(blog)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
