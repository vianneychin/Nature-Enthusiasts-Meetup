const User = require("../models/users");

module.exports = {
  index: async (req, res) => {
    try {
      const foundUser = await User.find({});
      res.render("users/index.ejs", {
        user: foundUser
      });
    } catch (err) {
      console.log(err);
      res.render(err);
    }
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
