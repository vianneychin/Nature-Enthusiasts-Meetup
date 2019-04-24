const Event = require("../models/events");

module.exports = {
  index: (req, res) => {
    res.render("events/index.ejs");
  },
  new: (req, res) => {
    res.render("events/new.ejs");
  }
};
