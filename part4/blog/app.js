const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const middleware = require("./utils/middleware")
const blogRouter = require('./controllers/index')
const usersRouter = require('./controllers/user')
const loginRouter = require("./controllers/login")
require("dotenv").config();
const app = express();
const { password } = process.env;

const uri = `mongodb+srv://gonzalomasa:${password}@blog.fjidtmc.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection");
  })
  .catch((error) => {
    console.error("Error database:", error);
  });

  app.use(cors());
  app.use(express.json());
  app.use(middleware.tokenExtractor);

app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);


module.exports = app;

