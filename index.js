const express = require("express");
const app = express();
const mongoose = require("mongoose");
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
