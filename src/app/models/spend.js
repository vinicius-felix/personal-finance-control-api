const mongoose = require('../../database');

const SpendSchema = new mongoose.Schema({

  date: {
    type: String,
    require: true,
  },

  category: {
    type: String,
    required: true
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

const Spend = mongoose.model('Spend', SpendSchema);

module.exports = Spend;