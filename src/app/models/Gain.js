const mongoose = require('../../database');

const GainSchema = new mongoose.Schema({

  date: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    required: true,
  },

  value: {
    type: Number,
    required: true
  },

  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gain = mongoose.model('Gain', GainSchema);

module.exports = Gain;
