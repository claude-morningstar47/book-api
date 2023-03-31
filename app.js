const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config({ path: "./config.env" });

// Initialisation de l'application Express
const app = express();

const corsOptions = {
  origin: "http://localhost:5000",
};

app
  .use(favicon(__dirname + "/book.png"))
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(cors(corsOptions))
  .use(helmet())
  .use(express.urlencoded({ extended: true }));

const db = require("./src/models");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to book-api application.");
});
// Routes (endpoints)
require("./src/routes/user.routes")(app);
require("./src/routes/book.routes")(app);

// Handle 404 error
app.use((req, res) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

// set port, listen for requests
const portNumber = process.env.PORT || 8080;
app.listen(portNumber, () => {
  console.log(`Server is running on port ${portNumber}.`);
});
