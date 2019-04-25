const Event = require("../models/events");


module.exports = {
  index: (req, res) => {
    res.render("events/index.ejs", 
    {
      event: Event
    });
  },
  new: (req, res) => {
    res.render("events/new.ejs");
  },
  show: (req, res) => {
    res.render("events/show.ejs")
  }
};
