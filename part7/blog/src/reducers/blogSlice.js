import {createSlice} from '@reduxjs/toolkit';
import blogService from '../services/blogs'

const initialState = [];

const blogSclice = createSlice({
    name : "blog",
    initialState,
    reducers:{

        
    setBlog(state, action) {
        return action.payload
      }
    }

})

export const {setBlog} = blogSclice.actions

export const initializeBlog = () =>{
    return async (dispatch) =>{
        const blog = await blogService.getAll();
        dispatch(setBlog(blog))
    }
}


export default blogSclice.reducer