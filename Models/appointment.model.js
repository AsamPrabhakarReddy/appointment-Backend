const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: {type: String, required: true },
  staffMember: {type: String, required: true },
}, { timestamps: true });

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
