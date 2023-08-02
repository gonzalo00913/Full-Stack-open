const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require('../models/Blog')

describe('Pruebas para crear una nueva publicación de blog', () => {
    it('La propiedad likes tiene valor 0 por defecto si no se proporciona', async () => {
        // Preparar los datos de la nueva publicación de blog sin la propiedad "likes"
        const newBlogData = {
          title: "Título del nuevo blog",
          author: "Autor del nuevo blog",
          url: "https://example.com/nuevo-blog",
          likes: 0, 
        };
      
        // Realizar la solicitud POST para crear la nueva publicación
        const response = await api.post('/api/blogs').send(newBlogData);
      
        // Verificar que se haya creado correctamente (estado 201)
        expect(response.status).toBe(201);
      
        const blog = await Blog.findOne({ _id: response.body._id });
        expect(blog.likes).toBe(0);
      });
  });