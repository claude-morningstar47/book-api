const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/database/sequelize");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

// Initialisation de l'application Express
const app = express();
const portNumber = process.env.PORT;

app
  .use(favicon(__dirname + "/book.png"))
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(cors())
  .use(helmet())
  .use(express.urlencoded({ extended: true }));

sequelize.initDB();

app.get("/", (req, res) => {
  res.send("Hello, la connexion a réussi!");
});

app.listen(portNumber, () => {
  console.log(`Server is running on http://localhost:${portNumber}`);
});
