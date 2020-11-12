const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const generateToken = require('../utils/generateToken');

const serviceRequestSchema = mongoose.Schema(
  {
    requestToken: {
      type: String,
      default: generateToken(8),
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    approvals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Approver',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
serviceRequestSchema.plugin(toJSON);
serviceRequestSchema.plugin(paginate);

serviceRequestSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Service
 */
const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
