const User = require("../models/users");

module.exports = {
  index: (req, res) => {
    res.render("users/index.ejs");
  },
  login: (req, res) => {
    res.render("users/login.ejs");
  },
  create: async (req, res) => {
    try {
      const createdUser = await User.create(req.body);
      console.log(createdUser);
      // res.send("createdUser");
      res.redirect("/events");
    } catch (err) {
      res.send(err);
    }
  },
  register: (req, res) => {
    res.render("users/register.ejs");
  }
};
