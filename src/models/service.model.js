const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const generateToken = require('../utils/generateToken');

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    approvals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Approvar',
      },
    ],
    serviceId: {
      type: String,
      default: generateToken(8),
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

serviceSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Service
 */
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
