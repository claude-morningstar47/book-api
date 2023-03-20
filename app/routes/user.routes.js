module.exports = (app) => {
  const auth = require("../controllers/auth.controller");
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  // Register
  router.post("/register", auth.register);
  // Login
  router.post("/login", auth.login);
  //   findAll
  router.get("/", user.findAll);
  //   findByPk
  router.get("/:id", user.findByPk);
  //   Update User
  router.patch("/", user.patch);
  // Delete User
  router.delete("/:id", user.delete);

  app.use("/api/auth", router);
};
