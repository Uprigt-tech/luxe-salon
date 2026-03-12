const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  enquiryType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Enquiry', enquirySchema);
