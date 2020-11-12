const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { approvarService } = require('../services');

const createApprovar = catchAsync(async (req, res) => {
  const approvar = await approvarService.createApprovar(req.body);
  const response = {
    result: approvar,
    status: {
      code: httpStatus.CREATED,
      message: 'Succesfully registered the approvers',
    },
  };
  res.status(httpStatus.CREATED).send(response);
});

const getApprovar = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await approvarService.queryApprovar(filter, options);
  res.send(result);
});

module.exports = {
  createApprovar,
  getApprovar,
};
