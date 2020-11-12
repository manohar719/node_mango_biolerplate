const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { serviceService } = require('../services');

const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  const response = {
    result: service,
    status: {
      code: httpStatus.CREATED,
      message: 'Succesfully registered the service',
    },
  };
  res.status(httpStatus.CREATED).send(response);
});

const getService = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceService.queryService(filter, options);
  res.send(result);
});

const getRequestService = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceService.queryServiceRequest(filter, options);
  res.send(result);
});

const requestService = catchAsync(async (req, res) => {
  const serviceRequest = await serviceService.createServiceRequest(req.body);
  const response = {
    result: serviceRequest,
    status: {
      code: httpStatus.CREATED,
      message: 'Succesfully registered the approvers',
    },
  };
  res.status(httpStatus.CREATED).send(response);
});

const approveService = catchAsync(async (req, res) => {
  const user = await serviceService.approveRequest(req.params.accessToken, req.body);
  res.send(user);
});

module.exports = {
  createService,
  getService,
  requestService,
  getRequestService,
  approveService,
};
