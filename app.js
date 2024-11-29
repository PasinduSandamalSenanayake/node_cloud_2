const express = require("express");
const app = express();

require("dotenv").config();

// Use the PORT environment variable provided by Cloud Run
const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
  res.send(`Hello World!! - ${process.env.ENVIRONMENT || "default"}`);
});

app.listen(PORT, () => {
  console.log(
    `Example app listening on port ${PORT}! - http://localhost:${PORT}`
  );
});
