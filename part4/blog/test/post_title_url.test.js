const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe('Pruebas para crear una nueva publicación de blog', () => {
  it('El backend responde con 400 Bad Request si faltan las propiedades title y url', async () => {
    // Preparar los datos de la nueva publicación de blog sin las propiedades "title" y "url"
    const newBlogData = {
      author: "Autor del nuevo blog",
      likes: 10,
    };

    // Realizar la solicitud POST sin proporcionar las propiedades "title" y "url"
    const response = await api.post('/api/blogs').send(newBlogData);

    // Verificar que el backend responde con 400 Bad Request
    expect(response.status).toBe(400);
  });
});