require("dotenv").config();
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blog);
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  /* const user = request.user; */

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const saveBlog = await blog.save();
    user.blog = user.blog.concat(saveBlog._id);
    await user.save();
    response.json(saveBlog);
  } catch (error) {
    next(error);
  }
});


blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  
  const user = request.user;
  // Verifica que el usuario esté autenticado
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  // Busca el blog por su ID
  const blog = await Blog.findById(id);

  // Verifica si el blog existe
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  // Comprueba si el usuario que envía la solicitud es el creador del blog
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } else {
    response.status(403).json({ error: 'Permission denied' });
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const { likes } = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog no encontrado" });
    }
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
