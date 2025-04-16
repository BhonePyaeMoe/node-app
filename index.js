const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./Models/blog");
const path = require("path");
const bodyParser = require("body-parser");

let mongoUrl =
  "mongodb+srv://moegyi2442:P4ter2442@blog.zjobhiv.mongodb.net/?retryWrites=true&w=majority&appName=Blog";

mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Example app listening on port 3000`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

app.get("/", (req, res) => {
  res.sendFile("./views/main.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/blog", (req, res) => {
  res.sendFile("./views/blog.html", { root: __dirname });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/submit", async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error saving blog:", err);
    res.status(500).json({ error: err.message });
  }
});
