const Event = require("../models/events");
const User = require("../models/users");

module.exports = {
  index: async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.usersDbId);
      const allEvents = await Event.find({})
        .populate("participants")
        .exec();
      const currentEvents = [];
      console.log(currentUser, allEvents);
      for (let i = 0; i < allEvents.length; i++) {
        console.log(allEvents[i].participants, currentUser);
        for (let j = 0; j < allEvents[i].participants.length; j++) {
          if (
            allEvents[i].participants[j]._id.toString() ===
            currentUser._id.toString()
          ) {
            currentEvents.push(allEvents[i]);
          }
        }
      }
      console.log(currentEvents, "current EVENTS DSDFSDF");
      res.render("events/index.ejs", {
        event: allEvents,
        userEvents: currentEvents,
        user: currentUser
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
  joinEvent: async (req, res) => {
    console.log("button is clicked");
    try {
      const currentUser = await User.findById(req.session.usersDbId);
      console.log(currentUser, "<---- currentUser");
      const foundEvent = await Event.findById(req.params.id);
      console.log(foundEvent, "<---- foundEvent");
      foundEvent.participants.push(currentUser);
      foundEvent.save();
      console.log(foundEvent, "<---- foundEvent after user is put in");
    } catch (err) {
      res.send(err);
    }

    // When the user that is signed in clicks the yes button on the event show page
    // Add the user to that event's participants array
    // const currentUser = await User.findById(req.session.usersDbId)
  },
  show: async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.usersDbId);
      const foundEvent = await Event.findById(req.params.id)
        // populating the the owner object ID so that the owner name displays on show page
        .populate("owner")
        .populate("participants")
        .exec();

      console.log(foundEvent);
      console.log(currentUser);
      res.render("events/show.ejs", {
        user: currentUser,
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
