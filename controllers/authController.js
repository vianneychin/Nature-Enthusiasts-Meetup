const bcrypt = require("bcryptjs");
const User = require("../models/users");

module.exports = {
  test: (req, res) => {
    console.log("=========================");
    console.log(req.session);
    console.log("=========================");
    req.session.myOwnPropertyIMadeUp = "Cheese";
    console.log("=========================");
    console.log(req.session);
    console.log("=========================");
    res.send("hi test");
  },
  login: (req, res) => {
    res.render("login.ejs");
  },
  register: (req, res) => {
    res.render("register.ejs");
  },
  createLoginSession: async (req, res) => {
    try {
      const foundUser = await User.findOne({ email: req.body.email });
      console.log(foundUser, "<-----log of the found user before if statement");
      console.log(req.body.email, "<----req.body.email");
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.logged = true;
          req.session.usersDbId = foundUser._id;
          console.log(foundUser, "<---- this is the foundUser ");
          console.log(req.session, "<---- console log of req.session");
          console.log(req.session.usersDbId, "<---- usersDbId");
          res.redirect("/events");
        } else {
          console.log("invalid email or password");
          res.redirect("/auth/login");
        }
      } else {
        console.log("This this not a valid email or password");
        res.redirect("/auth/login");
      }
    } catch (err) {
      res.send(err);
    }
  },
  createRegisterSession: async (req, res) => {
    try {
      const createdUser = await User.create(req.body);
      console.log(createdUser);
      // res.send("createdUser");
      if (createdUser) {
        req.session.logged = true;
        req.session.usersDbId = createdUser._id;
        console.log(req.session, "<---- req.session ");
        console.log(req.session.usersDbId, "<---- req.session.usersDbId");
        res.redirect("/user");
      }
    } catch (err) {
      res.send(err);
    }
  },
  destroy: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/auth/login");
      }
    });
  }
};
