import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlogRequest, deleteBlogRequest } from '../reducers/blogSlice';
import Togglable from './Togglable';

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);

  const handleLike = async (blog) => {
    const updatedLikes = blog.likes + 1;
    dispatch(likeBlogRequest(blog.id, updatedLikes));
  };

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Do you really want to remove the blog "${blog.title}"?`)) {
      dispatch(deleteBlogRequest(blog.id));
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

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
              <p className="blog-likes">Likes: {blog.likes}</p>
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
