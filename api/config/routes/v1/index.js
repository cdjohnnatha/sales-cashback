const express = require('express');
const resellerRoutes = require('./resellers/index');
const authRoutes = require('./auth-routes');
const productsRoutes = require('./products-routes');
const router = express.Router();

router.use('/resellers', resellerRoutes);
router.use('/auth', authRoutes);
router.use('/products', productsRoutes);

module.exports = router;
