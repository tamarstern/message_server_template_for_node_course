// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our Message schema
var MessageSchema   = new mongoose.Schema({
  text: String,
  title: String
});

// Export the Mongoose model
module.exports = mongoose.model('Message', MessageSchema);