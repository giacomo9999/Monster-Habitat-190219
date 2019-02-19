const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
require("dotenv").config();
const port = process.env.PORT;

let db;

MongoClient.connect(
  process.env.DB,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("mb-clone01-190219");
    app.listen(port, () => console.log("Listening on port " + port));
  }
);

function log(req, res, next) {
  console.log(new Date() + " -- Server request made.");
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", log, (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/monsters", (req, res) => {
  db.collection("monsters").save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("Saved to DB");
    res.redirect("/");
  });
});
