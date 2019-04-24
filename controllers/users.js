const User = require("../models/users");

module.exports = {
  login: (req, res) => {
    res.render("users/login.ejs");
  },
  signup: async (req, res) => {
    try {
      const createdUser = await User.create(req.body);
      console.log(createdUser);
      res.send("createdUser");
    } catch (err) {
      res.send(err);
    }

    // res.render("users/signup.ejs");
  }
};
