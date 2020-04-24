const express = require('express');
const router = express.Router();
const { createReseller, getReseller, resellerAccumulatedCashback } = require('../../../../controllers/v1/reseller-controller');
const resellerOrdersComissionRoutes = require('./reseller-order-comission-routes');

const authorizationMiddleware = require('../../../middlewares/authorization-middleware');

router.post('/', createReseller);
router.get('/profile', [authorizationMiddleware], getReseller);
router.use('/order-comissions', [authorizationMiddleware], resellerOrdersComissionRoutes);
router.get('/accumulated-cashback', [authorizationMiddleware], resellerAccumulatedCashback);

module.exports = router;