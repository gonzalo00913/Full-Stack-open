const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favorite blog", () => {
  test("when list has only one blog, return that blog", () => {
    const blogs = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
    ];

    const result = favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has multiple blogs, return the one with the most likes", () => {
    const blogs = [
      {
        title: "Blog 1",
        author: "Author 1",
        likes: 10,
      },
      {
        title: "Blog 2",
        author: "Author 2",
        likes: 5,
      },
      {
        title: "Blog 3",
        author: "Author 3",
        likes: 15,
      },
    ];

    const result = favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Blog 3",
      author: "Author 3",
      likes: 15,
    });
  });

  test("when list is empty, return null", () => {
    const blogs = [];
    const result = favoriteBlog(blogs);
    expect(result).toBeNull();
  });
});
