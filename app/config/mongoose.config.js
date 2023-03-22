// const mongoose = require("mongoose");
// const dbConfig = require("../config/db.config");

// mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   })
//   .then(() => {
//     console.log("Successfully connected to MongoDB.");
//   })
//   .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
//   });

// const db = {};

// db.mongoose = mongoose;

// db.user = require("./user.model");
// db.book = require("./book.model");

// module.exports = db;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Winds47:oOXINpycFSscX2uJ@cluster0.ms1vqof.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  console.log(err);
  // perform actions on the collection object
  collection();
  client.close();
});
