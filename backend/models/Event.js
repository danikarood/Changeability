const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  date: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/,
  },
  displayDate: { type: String, required: true },
  dayNumber: { type: Number, required: true, min: 1, max: 31 },
  time: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(document, result) {
      delete result.__v;
      return result;
    },
  },
});

module.exports = mongoose.model('Event', eventSchema);
