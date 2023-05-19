const express = require('express');
let booksdb = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);



public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).json({message: "username or password cannot empty"});
    }
    if (users.some(user => user.username == username)) {
        res.status(400).json({message: "user existed"});
    }
    users.push({"username":username,"password": password});
    res.send("The user" + (' ')+ (username) + " Has been added!")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  booksdb.getAll()
  .then(data => handleResponse(res, data))
  .catch(err => handleError(res, err));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    
    booksdb.getById(isbn)
    .then(data => handleResponse(res, data))
    .catch(err => handleError(res, err));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    
    booksdb.getByAuthor(author)
    .then(data => handleResponse(res, data))
    .catch(err => handleError(res, err));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    
    booksdb.getByTitle(title)
    .then(data => handleResponse(res, data))
    .catch(err => handleError(res, err));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    return res.status(200).json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
