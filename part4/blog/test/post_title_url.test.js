const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("Pruebas para crear una nueva publicación de blog", () => {
  it("El backend responde con 400 Bad Request si faltan las propiedades title y url", async () => {
    const newBlogData = {
      author: "Autor del nuevo blog",
      likes: 10,
    };

    const response = await api.post("/api/blogs").send(newBlogData);

    expect(response.status).toBe(400);
  });
});
