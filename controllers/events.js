const Event = require("../models/events");


module.exports = {
  index: async(req, res) => {
    try {
      const allEvents = await Event.find({})
      res.render("events/index.ejs",{
          event: allEvents
        }) 
      } 
      catch(err){
      res.send(err)
      }
    },

  new: (req, res) => {
    res.render("events/new.ejs");
    },
  create: async( req, res) => {
    try {
      console.log(req.body)
      const newEvent = await Event.create(req.body)
        console.log(newEvent)
        res.redirect("/events")
      }
    catch(err) {
      res.render(err)
    }
    },
    show: (req,res)=> {
      console.log("this function works")
    }
    // show: async(req,res) => {
    //   try { 
    //     const foundEvent = await Event.findById(req.params.id)
    //     console.log(foundEvent, "<====== the found event")
    //     res.render("events/show.ejs", {
    //       event: foundEvent
    //     })
    //   }
    //   catch(err) {
    //     res.render(err)
    //   }
    // }
}
  