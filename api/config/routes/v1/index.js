const express = require('express');
const resellerRoutes = require('./reseller-routes');
const authRoutes = require('./auth-routes');
const router = express.Router();

router.use('/resellers', resellerRoutes);
router.use('/auth', authRoutes);

module.exports = router;
