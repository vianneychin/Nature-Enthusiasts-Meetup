const User = require("../models/users");

module.exports = {
  login: (req, res) => {
    res.render("users/login.ejs");
  }
};
