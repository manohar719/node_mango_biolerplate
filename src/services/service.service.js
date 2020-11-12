const httpStatus = require('http-status');
const { Service, ServiceRequest } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a service
 * @param {Object} serviceBody
 * @returns {Promise<Service>}
 */
const createService = async (serviceBody) => {
  const service = await Service.create(serviceBody);
  return service;
};

/**
 * Create a service
 * @param {Object} serviceRequestBody
 * @returns {Promise<ServiceRequest>}
 */
const createServiceRequest = async (serviceRequestBody) => {
  const serviceRequest = await ServiceRequest.create(serviceRequestBody);
  return serviceRequest;
};

/**
 * Query for service
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryService = async (filter, options) => {
  const services = await Service.paginate(filter, options);
  return services;
};

const queryServiceRequest = async (filter, options) => {
  const serviceRequests = await ServiceRequest.paginate(filter, options);
  return serviceRequests;
};

/**
 * Get request by id
 * @param {ObjectId} id
 * @returns {Promise<ServiceRequest>}
 */
const getServiceRequestById = async (id) => {
  return ServiceRequest.findById(id);
};

/**
 * Get request by id
 * @param {ObjectId} id
 * @returns {Promise<ServiceRequestApprovals>}
 */
const getServiceRequestApprovalById = async (id) => {
  return Service.findById(id);
};

/**
 * Approve request by request _id
 * @param {ObjectId} requestId
 * @param {Object} updateBody
 * @returns {Promise<ServiceRequest>}
 */
const approveRequest = async (requestToken, updateBody) => {
  const serviceRequest = await getServiceRequestById(requestToken);
  if (!serviceRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service Request not found');
  }
  const serviceApprovals = await getServiceRequestApprovalById(serviceRequest.serviceId);
  if (updateBody.accessToken && !serviceApprovals.approvals.includes(updateBody.accessToken)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not a valid approver');
  }
  if (updateBody.accessToken && serviceRequest.approvals.includes(updateBody.accessToken)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Request already approved');
  }
  Object.assign(serviceRequest, { approvals: updateBody.accessToken });
  await serviceRequest.save();
  return serviceRequest;
};

module.exports = {
  createService,
  queryService,
  createServiceRequest,
  queryServiceRequest,
  approveRequest,
};
