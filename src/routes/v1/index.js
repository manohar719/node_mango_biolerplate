const express = require('express');
// const authRoute = require('./auth.route');
// const userRoute = require('./user.route');
const approvarRoute = require('./approvar.route');
const serviceRoute = require('./service.route');
const docsRoute = require('./docs.route');

const router = express.Router();

// router.use('/auth', authRoute);
// router.use('/users', userRoute);
router.use('/approver', approvarRoute);
router.use('/service', serviceRoute);
router.use('/docs', docsRoute);

module.exports = router;
