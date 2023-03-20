module.exports = (app) => {
  const books = require("../controllers/book.controller");

  var router = require("express").Router();

  // Create a new books
  router.post("/", books.create);

  // Retrieve all books
  router.get("/", books.findAll);

  // Retrieve all published books
  router.get("/published", books.findAllPublished);

  // Retrieve a single books with id
  router.get("/:id", books.findOne);

  // Update a books with id
  router.put("/:id", books.update);

  // Delete a books with id
  router.delete("/:id", books.delete);

  // Delete all books
  router.delete("/", books.deleteAll);

  app.use("/api/book", router);
};
