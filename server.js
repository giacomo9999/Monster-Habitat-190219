const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(console.log("Connected to DB"), err =>
    console.log("Can't connect to DB")
  );

function log(req, res, next) {
  console.log(new Date() + " -- Server request made.");
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", log, (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log("Listening on port " + port));

app.post("/quotes", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});
