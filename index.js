const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "devendraBhole",
    content: "Hard work is important to achive success",
  },
  {
    id: uuidv4(),
    username: "priyankaBhole",
    content: "I got my first internship in web development",
  },
  {
    id: uuidv4(),
    username: "nandini",
    content: "I am going to picnic",
  },
];

//to create main index route
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//to create add new post route
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//to  handle the form data submitted from /posts/new page and render it on /posts
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

//to show the post with valid id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

//to update a content in post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  console.log(newContent);
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

//route for edit the post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

//delete the post with given id
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
