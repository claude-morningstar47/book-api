require("dotenv").config();

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Secret Key",
  DB: "book_api",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV !== "production",
};
