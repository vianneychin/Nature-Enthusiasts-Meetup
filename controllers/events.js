const Event = require("../models/events");

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
      const newEvent = await Event.create(req.body);
      console.log(newEvent);
      res.redirect("/events");
    } catch (err) {
      res.render(err);
    }
  },
  show: async (req, res) => {
    try {
      const foundEvent = await Event.findById(req.params.id);
      console.log(foundEvent);
      res.render("events/show.ejs", {
        event: foundEvent
        // sessionId: req.session.usersDbId
      });
    } catch (err) {
      res.send(err);
    }
  },
  edit: async(req,res) => {
    try {
      const editEvent = await Event.findById(req.params.id)
      console.log(editEvent)
        res.render("events/edit.ejs", {
          event: editEvent,
          id: req.params.id
      })
    } catch(err){
      res.send(err)
    }
  },
  update: async (req, res) => {
    try {
      const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body);
      console.log(updateEvent);
      res.redirect("/events");
    } catch (err) {
      res.send(err);
    }
  },
  destroy: async(req, res) => {
    try {
      const destroyedEvent = await Event.findByIdAndDelete(req.params.id)
      console.log(destroyedEvent)
      res.redirect("/events")
    }
    catch(err) {
      res.send(err)
    }
  }
};
