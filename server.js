const express = require("express");
const app = express();

app.listen(3000, () => console.log("Listening on 3000"));

function log() {
  console.log("Server request made.");
}

app.use("/", log);
app.get("/", (req, res) => res.send("Up and running!!"));
