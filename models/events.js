const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  findUs: String
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
