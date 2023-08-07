const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");

describe("Pruebas para crear una nueva publicación de blog", () => {
  it("La propiedad likes tiene valor 0 por defecto si no se proporciona", async () => {
    const newBlogData = {
      title: "Título del nuevo blog",
      author: "Autor del nuevo blog",
      url: "https://example.com/nuevo-blog",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", "Bearer tu-token")
      .send(newBlogData);

    expect(response.status).toBe(201);

    const blog = await Blog.findOne({ _id: response.body._id });
    expect(blog.likes).toBe(0);
  });
});
