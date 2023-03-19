const Sequelize = require("sequelize");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

require("dotenv").config();
const logging = !process.env.NODE_ENV === "production";

const sequelize = new Sequelize("book_api", "root", "Secret Key", {
  host: "localhost",
  dialect: "mysql",
  logging: logging,
});

const User = UserModel(sequelize, Sequelize.DataTypes);

const initDB = async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      const password = "Winds";
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createUser = User.create({
        userName: "Claude",
        email: "mopenobiaclaude@gmail.com",
        userType: "admin",
        password: hashedPassword,
      });
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

module.exports = {
  initDB,
  User,
};
