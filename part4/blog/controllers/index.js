const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

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
blogRouter.post("/", async (request, response) => {
  const blogData = request.body;

  if (!blogData.title || !blogData.url) {
    response.status(400).json({ error: "Falta la propiedad title o url" });
    return;
  }

  try {
    const blog = new Blog(blogData);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    console.error("Se produjo un error:", error);
    response.status(400).json({ error: "Error al crear el blog" });
  }
});


blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).send("Blog eliminado");
  } catch (error) {
    console.log("error al eliminar la nota", error);
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
