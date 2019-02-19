const express = require("express");
const app = express();

function log(req, res, next) {
  console.log(new Date()+" -- Server request made.");
  next();
}

app.get("/", log, (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(3000, () => console.log("Listening on 3000"));
