const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const logger = require("morgan");
const userRouter = require("./routes/users");
require("./db/db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));

app.use("/user", userRouter);

// Rendering the home.ejs landing page
app.get("/", (req, res) => {
  res.render("home/home.ejs");
});

app.listen(port, err => {
  console.log(err || "App is listening on port", port);
});
