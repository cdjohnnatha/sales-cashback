const express = require('express');
const router = express.Router();
const { createReseller, getReseller } = require('../../../../controllers/v1/reseller-controller');
const ordersRoutes = require('./reseller-orders-routes');

const authorizationMiddleware = require('../../../middlewares/authorization-middleware');

router.post('/', createReseller);
router.get('/profile', [authorizationMiddleware], getReseller);
router.use('/orders', [authorizationMiddleware], ordersRoutes);

module.exports = router;