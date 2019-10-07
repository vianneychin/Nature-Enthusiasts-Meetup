const Event = require('../models/events')
const User = require('../models/users')
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD3TNv_MLt6FZLTPzFGm0WCeE-EL2x2yGw '
})

module.exports = {
  index: async (req, res) => {
    if (req.session.logged === true)
      try {
        const currentUser = await User.findById(req.session.usersDbId)
        const allEvents = await Event.find({})
          .populate('participants')
          .exec()
        const currentEvents = []
        for (let i = 0; i < allEvents.length; i++) {
          for (let j = 0; j < allEvents[i].participants.length; j++) {
            if (
              allEvents[i].participants[j]._id.toString() ===
              currentUser._id.toString()
            ) {
              currentEvents.push(allEvents[i])
            }
          }
        }
        const results = await Promise.all(currentEvents)
        res.render('events/index.ejs', {
          event: allEvents,
          userEvents: results,
          user: currentUser
        })
      } catch (err) {
        res.send(err)
      }
    else {
      res.redirect('/auth/login')
    }
  },

  new: (req, res) => {
    const currentUser = User.findById(req.session.usersDbId)
    if (req.session.logged === true) {
      res.render('events/new.ejs', {
        user: currentUser
      })
    } else {
      res.redirect('/auth/login')
    }
  },
  create: async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.usersDbId)
      req.body.owner = currentUser
      const newEvent = await Event.create(req.body)
      newEvent.participants.push(currentUser)
      newEvent.save()
      res.redirect('/events')
    } catch (err) {
      res.render(err)
    }
  },
  joinEvent: async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.usersDbId)
      const foundEvent = await Event.findById(req.params.id)
      foundEvent.participants.push(currentUser)
      foundEvent.save()
      req.session.joinMessage = 'You are confirmed for this event!'
      res.redirect(`/events/${req.params.id}`)
    } catch (err) {
      res.send(err)
    }
  },
  leaveEvent: async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.usersDbId)
      const foundEvent = await Event.findById(req.params.id)
      const removeUser = await foundEvent.participants.indexOf(currentUser)
      foundEvent.participants.splice(removeUser, 1)
      foundEvent.save()
      req.session.joinMessage = ''
      res.redirect(`/events/${req.params.id}`)
    } catch (err) {
      res.send(err)
    }
  },
  show: async (req, res) => {
    if (req.session.logged === true)
      try {
        const currentUser = await User.findById(req.session.usersDbId)
        const foundEvent = await Event.findById(req.params.id)
          .populate('owner')
          .populate('participants')
          .exec()

        let isAttending = false
        for (let i = 0; i < foundEvent.participants.length; i++) {
          if (
            foundEvent.participants[i]._id.toString() ===
            currentUser._id.toString()
          ) {
            isAttending = true
            req.session.joinMessage = 'You are confirmed for this event!'
          }
        }
        googleMapsClient.geocode(
          {
            address: foundEvent.location
          },
          function(err, response) {
            if (!err) {
              foundEvent.coords = response.json.results[0].geometry.location
              res.render('events/show.ejs', {
                user: currentUser,
                event: foundEvent,
                latNum: foundEvent.coords.lat,
                lngNum: foundEvent.coords.lng,
                sessionId: req.session.usersDbId,
                isAttending,
                session: req.session
              })
            }
          }
        )
      } catch (err) {
        res.send(err)
      }
    else {
      res.redirect('/auth/login')
    }
  },
  edit: async (req, res) => {
    if (req.session.logged === true)
      try {
        const editEvent = await Event.findById(req.params.id)
          .populate('owner')
          .exec()
        if (
          editEvent.owner._id.toString() === req.session.usersDbId.toString()
        ) {
          res.render('events/edit.ejs', {
            event: editEvent,
            id: req.params.id,
            user: req.session.usersDbId
          })
        } else {
          res.redirect(`/events/${req.params.id}`)
        }
      } catch (err) {
        res.send(err)
      }
    else {
      res.redirect('/auth/login')
    }
  },
  update: async (req, res) => {
    try {
      const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body)
      res.redirect('/events')
    } catch (err) {
      res.send(err)
    }
  },
  destroy: async (req, res) => {
    try {
      const destroyedEvent = await Event.findByIdAndDelete(req.params.id)
      res.redirect('/events')
    } catch (err) {
      res.send(err)
    }
  }
}
