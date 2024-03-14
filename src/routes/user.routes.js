module.exports = (app) => {
  const auth = require("../controllers/auth.controller");
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  router
    .post("/register", auth.register)
    .post("/login", auth.login)
    .get("/", user.findAll)
    .get("/:id", user.findByPk)
    .patch("/:id", user.patch)
    .delete("/:id", user.delete);
// tests 
  app.use("/api/auth", router);
};
