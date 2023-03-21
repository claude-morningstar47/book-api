module.exports = (app) => {
  const books = require("../controllers/book.controller");

  var router = require("express").Router();

  router
    .post("/", books.create) // Create a new books
    .get("/", books.findAll) // Retrieve all books
    .get("/published", books.findAllPublished) // Retrieve all published books
    .get("/:id", books.findOne) // Retrieve a single books with id
    .put("/:id", books.update) // Update a books with id
    .delete("/:id", books.delete) // Delete a books with id
    .delete("/", books.deleteAll); // Delete all books

  app.use("/api/books", router);
};
