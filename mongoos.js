const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const MongoClient = require("mongodb").MongoClient;

// configuration de l'application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// configuration de la base de données MongoDB
// const url = "mongodb://localhost:27017/";
const dbName = "Cluster0";
// const client = new MongoClient(url, { useNewUrlParser: true });

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Winds47:oOXINpycFSscX2uJ@cluster0.ms1vqof.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// endpoint pour récupérer tous les utilisateurs
app.get("/users", (req, res) => {
  client.connect((err) => {
    if (err) throw err;
    const db = client.db(dbName);
    const usersCol = db.collection("users");
    usersCol.find({}).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
});

// endpoint pour ajouter un nouvel utilisateur
app.post("/users", (req, res) => {
  const user = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  };
  client.connect((err) => {
    if (err) throw err;
    const db = client.db(dbName);
    const usersCol = db.collection("users");
    usersCol.insertOne(user, (err, result) => {
      if (err) throw err;
      res.send(result.ops[0]);
      client.close();
    });
  });
});

// endpoint pour récupérer tous les livres
app.get("/books", (req, res) => {
  client.connect((err) => {
    if (err) throw err;
    const db = client.db(dbName);
    const booksCol = db.collection("books");
    booksCol.find({}).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
});

// endpoint pour ajouter un nouveau livre
app.post("/books", (req, res) => {
  const book = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  };
  client.connect((err) => {
    if (err) throw err;
    const db = client.db(dbName);
    const booksCol = db.collection("books");
    booksCol.insertOne(book, (err, result) => {
      if (err) throw err;
      res.send(result.ops[0]);
      client.close();
    });
  });
});

// démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
