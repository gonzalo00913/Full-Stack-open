const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  console.log("body", body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  try {
    const saveBlog = await blog.save();
    response.json(saveBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    error(next);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const {id} = request.params;
  const {likes} = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id,{ likes },{ new: true });

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog no encontrado" });
    }
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
