import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "../components/BlogForm";

describe("BlogForm Component", () => {
  it("llama al controlador de eventos con los detalles correctos al crear un nuevo blog", () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);

    const titleInput = component.container.querySelector("input[name='title']");
    const authorInput = component.container.querySelector("input[name='author']");
    const urlInput = component.container.querySelector("input[name='url']");
    const likesInput = component.container.querySelector("input[name='likes']");

    fireEvent.change(titleInput, {
      target: { value: "Nuevo Blog" },
    });
    fireEvent.change(authorInput, {
      target: { value: "Autor del Blog" },
    });
    fireEvent.change(urlInput, {
      target: { value: "https://ejemplo.com" },
    });
    fireEvent.change(likesInput, {
      target: { value: "5" },
    });

    const form = component.container.querySelector("form");
    fireEvent.submit(form);

    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "Nuevo Blog",
      author: "Autor del Blog",
      url: "https://ejemplo.com",
      likes: 5,
    });
  });
});
