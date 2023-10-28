import React from "react";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog Component", () => {
  const blog = {
    title: "Ejemplo de Blog",
    author: "Autor del Blog",
    url: "https://ejemplo.com",
    likes: 10,
  };

  it("verifica que el componente Blog muestra título y autor, pero no URL ni likes por defecto", () => {
    const component = render(<Blog blog={blog}/>);

  
    const blogElements = component.container.querySelectorAll(".blog");

   
    expect(blogElements.length).toBeGreaterThan(0);


    const titleElement = component.container.querySelector(".blog span");
    const authorElement = component.container.querySelector(".blog p");
    expect(titleElement).toBeDefined(); 
    expect(authorElement).toBeDefined(); 

   
    const urlElement = component.container.querySelector(".blog .url");
    const likesElement = component.container.querySelector(".blog .likes");
    expect(urlElement).toBeNull(); 
    expect(likesElement).toBeNull(); 
  });
});