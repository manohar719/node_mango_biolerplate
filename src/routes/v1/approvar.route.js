const express = require('express');
// const validate = require('../../middlewares/validate');
// const approvarValidation = require('../../validations/');
const approvarController = require('../../controllers/approvar.controller');

const router = express.Router();

router.route('/').post(approvarController.createApprovar).get(approvarController.getApprovar);

module.exports = router;
