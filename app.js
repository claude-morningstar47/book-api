const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/database/sequelize");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./src/auth/authRoutes");
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

app.use("/book/auth", authRoutes);

// Handle 404 error
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(portNumber, () => {
  console.log(`Server is running on http://localhost:${portNumber}`);
});
