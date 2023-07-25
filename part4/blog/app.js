const express = require("express");
const blogRouter = require('./controllers/index')
const mongoose = require("mongoose");
const cors = require("cors");
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

app.use('/api/blogs', blogRouter)


module.exports = app;
