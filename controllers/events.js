const Event = require("../models/events");


module.exports = {
  index: async(req, res) => {
    try {
      const foundEvent = await Event.find({})
      res.render("events/index.ejs", 
      {
        event: Event
      }) 
      }
      catch (err){
      res.render(err)
      }
    },
    new: (req, res) => {
    res.render("events/new.ejs");
    }
    }
//   show: (req, res) => {
//     res.render("events/show.ejs")
//   }
// };
