const express = require("express");
const app = express();

// function log() {
//   console.log("Server request made.");
// }

// app.use("/", log);
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
// app.get("/",(req, res) => res.send("Blah blah blah"));
app.listen(3000, () => console.log("Listening on 3000"));
