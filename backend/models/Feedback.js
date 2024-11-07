const mongoose = require('mongoose');

// Define the Feedback schema
const feedbackSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
