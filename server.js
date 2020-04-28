const express = require("express");
const encoder = require("nodejs-base64-encode");
const ejs = require("ejs");

var app = express();
var port = process.env.PORT || 8080;
var authenticationStatus = false;

// Store logins in Javascript array xdddddddddddddddddd
// maybe i will make it use atlas later
var logins = [];
var notes = [];
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  var result = logins.find((login) => login.password == req.body.password);
  if (result) {
    authenticationStatus = true;
    res.redirect("/dashboard");
  } else {
    res.redirect("/login");
  }
});
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  logins.push({
    username: req.body.username,
    password: req.body.password,
  });

  console.log(logins);

  res.redirect("/login");
});

app.get("/dashboard", function (req, res) {
  if (authenticationStatus) {
    res.render("dashboard", { accNotes: notes });
  } else {
    res.redirect("/");
  }
});

app.get("/dashboard/newNote", function (req, res) {
  if (authenticationStatus) {
    res.render("newNote");
  } else {
    res.redirect("/");
  }
});

app.post("/dashboard/newNote", function (req, res) {
  notes.push({
    username
    name: req.body.noteName;
    content: encoder.encode(req.body.noteContent)
  });
});


var server = app.listen(port, () => {
  console.log("http://localhost:" + port);
});
