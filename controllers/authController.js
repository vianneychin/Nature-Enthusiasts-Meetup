const bcrypt = require("bcryptjs");
const User = require("../models/users");
let count = 0;
let loginCount = 0;
module.exports = {
  login: (req, res) => {
    loginCount++;
    if (loginCount > 2) {
      loginCount = 0;
      req.session.loginMessage = "";
    }
    res.render("login.ejs", {
      session: req.session
    });
  },
  register: (req, res) => {
    count++;
    if (count > 1) {
      count = 0;
      req.session.emailMessage = "";
    }
    res.render("register.ejs", {
      session: req.session
    });
  },
  createLoginSession: async (req, res) => {
    try {
      // Finding User in db that matches the email typed on the login form
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
          req.session.loginMessage = "This this not a valid email or password";
          res.redirect("/auth/login");
        }
      } else {
        req.session.loginMessage = "This this not a valid email or password";
        res.redirect("/auth/login");
      }
    } catch (err) {
      req.session.loginMessage = "Username or password is incorrect!";
      res.redirect("/auth/login");
    }
  },
  createRegisterSession: async (req, res) => {
    try {
      const createdUser = await User.create(req.body);
      console.log(createdUser);
      if (createdUser) {
        req.session.logged = true;
        req.session.usersDbId = createdUser._id;
        console.log(req.session, "<---- req.session ");
        console.log(req.session.usersDbId, "<---- req.session.usersDbId");
        res.redirect("/user");
      }
    } catch (err) {
      req.session.emailMessage = "Email address has already been registered!";
      res.redirect("/auth/register");
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
