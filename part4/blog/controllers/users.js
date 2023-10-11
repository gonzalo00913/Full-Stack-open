const bcrypt = require('bcrypt')
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  try {
    const saveUSer = await user.save();
    response.json(saveUSer);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/', async(_request, response) =>{
  const userBlog = await User.find({}).populate('blog', { title : 1, author: 1, url: 1, likes: 1 })
  response.json(userBlog)
})


module.exports = userRouter;
