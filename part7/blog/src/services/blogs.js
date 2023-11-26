import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blog'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) =>{
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data;
}

const updateLikes = async (id, updatedLikes) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, { likes: updatedLikes }, config);
  return response.data;
};

const deleteBlog = async (id, blogToDelete) =>{
  const config = {
    headers: { Authorization: token },
  };
 const response = await axios.delete(`${baseUrl}/${id}`,blogToDelete,config) 
 return response.data;
}


export default {getAll, create, setToken, updateLikes, deleteBlog} 