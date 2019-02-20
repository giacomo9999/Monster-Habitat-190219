const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.set("view engine", "ejs");

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
app.use(bodyParser.json());
app.use(express.static("public"));
// app.get("/", log, (req, res) => res.sendFile(__dirname + "/index.html"));

app.get("/", log, (req, res) => {
  db.collection("monsters")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // renders index.ejs
      res.render("./index.ejs", { monsters: result });
    });
});

app.post("/monsters", (req, res) => {
  db.collection("monsters").insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("Saved to DB");
    res.redirect("/");
  });
});

app.put("/monsters", (req, res) => {
  db.collection("monsters").findOneAndUpdate(
    { name: req.body.name },
    { $set: { frequency: req.body.frequency } },
    (err, result) => {
      if (err) return console.log(err);
      console.log(
        req.body.name + " updated with frequency " + req.body.frequency
      );
      res.redirect("/");
    }
  );
  // console.log("Entry updated:", req.body);
});
