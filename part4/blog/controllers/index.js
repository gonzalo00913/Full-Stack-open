const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/Users");
const authenticateToken = require("../utils/middleware");
require("dotenv").config();

// GET - Me traigo los blogs
blogRouter.get("/", async (request, response) => {
  try {
    const blog = await Blog.find({});
    response.json(blog);
  } catch (error) {
    console.log("Se produjo un error:", error);
  }
});

// GET - Me traigo los blog por ID
blogRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const blog = await Blog.findOne({ _id: id });
    if (blog) {
      const result = blog.data;
      response.json(result);
    } else {
      response.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log("Se produjo un error:", next(error));
  }
});

// GET - Posteo blogs
blogRouter.post("/", authenticateToken, async (request, response) => {
  const blogData = request.body;

  if (!blogData.title || !blogData.url) {
    response.status(400).json({ error: "Falta la propiedad title o url" });
    return;
  }

  try {
    const user = await User.findById(blogData.userId);
    if (!user) {
      response.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const blog = new Blog({
      title: blogData.title,
      url: blogData.url,
      author: blogData.author,
      user: user._id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (error) {
    console.error("Se produjo un error:", error);
    response.status(400).json({ error: "Error al crear el blog" });
  }
});

// DELETE - Elimino blogs
blogRouter.delete("/:id", authenticateToken, async (request, response) => {
  const blogId = request.params.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    const user = request.user; // El usuario decodificado del token
    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(403)
        .json({ error: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndRemove(blogId);
    response.status(204).send("Blog eliminado");
  } catch (error) {
    console.log("Error al eliminar el blog", error);
    response.status(500).json({ error: "Error al eliminar el blog" });
  }
});

// PUT - Modifico blogs
blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blogData = request.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      { title: blogData.title }
    );
    response.json(blog);
  } catch (error) {
    console.log("Se produjo un error:", error);
  }
});

module.exports = blogRouter;
