const express = require("express");

const app = express();

const PROT = 8080;

require("dotenv").config();

app.get("/", (req, res) => {
  res.send(`Hello World!!- ${process.env.ENVIRONMENT}`);
});

//
app.listen(PROT, () => {
  console.log(
    `Example app listening on port ${PROT}!- http://localhost:${PROT}`
  );
});
