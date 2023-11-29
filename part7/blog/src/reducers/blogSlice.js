import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },

    likeBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },

    deleteBlog(state, action) {
      const { id } = action.payload;
      return state.filter((blog) => blog.id !== id);
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    },
  },
});

export const { setBlog, appendBlog, likeBlog, deleteBlog } = blogSlice.actions;

export const initializeBlog = () => {
  return async (dispatch) => {
    const blog = await blogService.getAll();
    dispatch(setBlog(blog));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlogRequest = (id, updatedLikes) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateLikes(id, updatedLikes);
    dispatch(likeBlog(updatedBlog));
  };
};

export const deleteBlogRequest = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog({ id }));
};
};

export default blogSlice.reducer;
