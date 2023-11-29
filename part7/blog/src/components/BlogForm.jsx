import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogSlice";

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    const likes = event.target.likes.value;

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    event.target.likes.value = '';
    dispatch(createBlog({ title, author, url, likes }));
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input name="title" />
        </div>
        <div>
          Author:
          <input name="author" />
        </div>
        <div>
          URL:
          <input name="url" />
        </div>
        <div>
          Likes:
          <input name="likes" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BlogForm;

