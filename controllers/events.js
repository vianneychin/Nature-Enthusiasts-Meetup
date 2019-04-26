const Event = require("../models/events");
const User = require("../models/users");

module.exports = {
  index: async (req, res) => {
    try {
      const allEvents = await Event.find({});
      res.render("events/index.ejs", {
        event: allEvents
      });
    } catch (err) {
      res.send(err);
    }
  },

  new: (req, res) => {
    res.render("events/new.ejs");
  },
  create: async (req, res) => {
    try {
      console.log(req.body);
      // Finding the user that is logged in with req.session.usersDbId
      const currentUser = await User.findById(req.session.usersDbId);
      // Creating owner property on body since we don't have it on the event creation page and setting it to the currentUser so we can get the name.
      req.body.owner = currentUser;
      // Creating the new event
      const newEvent = await Event.create(req.body);
      console.log(newEvent);
      res.redirect("/events");
    } catch (err) {
      res.render(err);
    }
  },
  show: async (req, res) => {
    try {
      const foundEvent = await Event.findById(req.params.id)
        // populating the the owner object ID so that the owner name displays on show page
        .populate("owner")
        .exec();
      console.log(foundEvent);
      res.render("events/show.ejs", {
        event: foundEvent,
        sessionId: req.session.usersDbId
      });
    } catch (err) {
      res.send(err);
    }
  },
  edit: async (req, res) => {
    try {
      const editEvent = await Event.findById(req.params.id);
      console.log(editEvent);
      res.render("events/edit.ejs", {
        event: editEvent,
        id: req.params.id
      });
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res) => {
    try {
      const updateEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      console.log(updateEvent);
      res.redirect("/events");
    } catch (err) {
      res.send(err);
    }
  },
  destroy: async (req, res) => {
    try {
      const destroyedEvent = await Event.findByIdAndDelete(req.params.id);
      console.log(destroyedEvent);
      res.redirect("/events");
    } catch (err) {
      res.send(err);
    }
  }
};
