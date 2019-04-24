const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  participants: [],
  owner: [],
  description: String,
  findUs: String
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
