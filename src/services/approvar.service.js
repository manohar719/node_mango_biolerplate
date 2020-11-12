const httpStatus = require('http-status');
const { Approvar } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a approve
 * @param {Object} approvarBody
 * @returns {Promise<Approvar>}
 */
const createApprovar = async (approvarBody) => {
  if (await Approvar.isNameTaken(approvarBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const approvar = await Approvar.create(approvarBody);
  return approvar;
};

/**
 * Query for approve
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryApprovar = async (filter, options) => {
  const approvars = await Approvar.paginate(filter, options);
  return approvars;
};

module.exports = {
  createApprovar,
  queryApprovar,
};
