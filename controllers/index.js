
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');
const accountRoute = require('./accountRoute')
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/settings', accountRoute);
module.exports = router;
