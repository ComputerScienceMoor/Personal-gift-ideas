const mongoose = require('mongoose');

const giftIdeaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  idea: {
    type: String,
    required: true,
    trim: true
  },
  occasion: {
    type: String,
    required: true,
    enum: ['Birthday', 'Christmas', 'Anniversary', 'Wedding', 'Graduation', "Valentine's Day", "Mother's Day", "Father's Day", 'Other']
  },
  relationship: {
    type: String,
    required: true,
    enum: ['Wife', 'Husband', 'Father', 'Mother', 'Friend', 'Colleague', 'Other']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GiftIdea', giftIdeaSchema);
