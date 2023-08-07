const dummy = require("../utils/list_helper").dummy;

test("dummy returns one", () => {
  const blogs = [];
  expect(dummy(blogs)).toBe(1);
});
