// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var BeerSchema   = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  date:{
    type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
});

// Export the Mongoose model
module.exports = mongoose.model('Beer', BeerSchema);
