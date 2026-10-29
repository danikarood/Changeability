const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  age: { type: Number, required: true, min: 1, max: 120 },
  gender: { type: String, required: true, trim: true, maxlength: 40 },
  programme: { type: String, required: true, trim: true, maxlength: 120 },
  programmeFull: { type: String, trim: true, maxlength: 200 },
  type: { type: String, enum: ['beneficiary', 'volunteer'], required: true, index: true },
  email: { type: String, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 40 },
  address: { type: String, trim: true, maxlength: 300 },
  img: { type: String, maxlength: 12_000_000 },
  status: { type: String, trim: true, maxlength: 40, default: 'Active' },
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

module.exports = mongoose.model('Entity', entitySchema);
