const express = require("express");
const app = express();
const port = 3000;

app.listen(port, err => {
  console.log(err || "App is listening on port", port);
});
