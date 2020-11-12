const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const generateToken = require('../utils/generateToken');
const { levels } = require('../config/levels');

const approvarSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: levels,
      required: true,
    },
    accessToken: {
      type: String,
      default: generateToken(8),
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
approvarSchema.plugin(toJSON);
approvarSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The approvar's name
 * @param {ObjectId} [excludeApprovarId] - The id of the approvar to be excluded
 * @returns {Promise<boolean>}
 */
approvarSchema.statics.isNameTaken = async function (name, excludeApprovarId) {
  const approvar = await this.findOne({ name, _id: { $ne: excludeApprovarId } });
  return !!approvar;
};

approvarSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Approvar
 */
const Approvar = mongoose.model('Approvar', approvarSchema);

module.exports = Approvar;
