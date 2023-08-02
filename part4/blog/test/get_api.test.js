const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe('Pruebas para la lista de blogs', () => {
  it('Debería devolver una lista de blogs en formato JSON', async () => {
    const response = await api.get('/api/blogs');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

   
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});