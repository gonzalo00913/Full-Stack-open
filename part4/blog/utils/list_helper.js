const dummy = (blog) => {
  return blog = 1;
};

const totalLikes = (blog) => {
  let total = 0;

  for (let i = 0; i < blog.length; i++) {
    total += blog[i].likes;
  }

  return total;
};

const favoriteBlog = (blog) => {
  if (blog.length === 0) {
    return null;
  }

  let blogMaxLikes = blog[0];
  for (let i = 1; i < blog.length; i++) {
    if (blog[i].likes > blogMaxLikes.likes) {
      blogMaxLikes = blog[i];
    }
  }

  return blogMaxLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
