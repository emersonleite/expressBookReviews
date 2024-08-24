const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res
    .status(201)
    .json({ message: "Customer successfully registred. Now you can login" });
});

public_users.get("/", (_req, res) => {
  return res.status(200).json({ books });
});

public_users.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;

  if (books[isbn]) {
    return res.status(200).json({ ...books[isbn] });
  }

  return res.status(404).json({ message: "Book not found" });
});

public_users.get("/author/:author", (req, res) => {
  let booksByAuthorEntries = Object.entries(books);

  const booksByAuthor = booksByAuthorEntries.reduce((acc, curr) => {
    if (req.params.author === curr[1].author) {
      const { title, reviews } = curr[1];
      let book = { isbn: curr[0], title, reviews };
      acc = [...acc, book];
    }
    return acc;
  }, []);

  if (booksByAuthor.length > 0) {
    return res.status(200).json({ booksByAuthor });
  }

  return res.status(404).json({ message: "No books found for this author" });
});

public_users.get("/title/:title", (req, res) => {
  let booksByTitleEntries = Object.entries(books);

  const booksByTitle = booksByTitleEntries.reduce((acc, curr) => {
    if (req.params.title === curr[1].title) {
      const { author, reviews } = curr[1];
      let book = { isbn: curr[0], author, reviews };
      acc = [...acc, book];
    }
    return acc;
  }, []);

  if (booksByTitle.length > 0) {
    return res.status(200).json({ booksByTitle });
  }

  return res.status(404).json({ message: "No books found with this title" });
});

public_users.get("/review/:isbn", (req, res) => {
  const { isbn } = req.params;

  if (books[isbn]) {
    return res.status(200).json({ reviews: books[isbn].reviews });
  }

  return res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;
