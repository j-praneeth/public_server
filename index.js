const express = require("express");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())
const auth = require("./routes/auth");
app.use("/auth", auth);

const generate = require("./routes/generate");
app.use("/generate", generate);

const attendance = require("./routes/attendenceController");

app.use("/attendance", attendance);

const port = 3000;
app.get("/", (req, res) => {
  res.status(200).send("Idiot server Running Successfully Get Lost ....");
});

app.listen(port, (req, res) => {
  console.log(`Idiot server is running at ${port}`);
});
