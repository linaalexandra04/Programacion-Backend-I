const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
});

module.exports = mongoose.model('Pet', PetSchema);
