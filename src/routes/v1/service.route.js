const express = require('express');
const serviceController = require('../../controllers/service.controller');

const router = express.Router();

router.route('/').post(serviceController.createService).get(serviceController.getService);

router.route('/request').post(serviceController.requestService).get(serviceController.getRequestService);

router.route('/approve/:accessToken').patch(serviceController.approveService);

module.exports = router;
