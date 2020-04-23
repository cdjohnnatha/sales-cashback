const express = require('express');
const router = express.Router();
const { createReseller, getReseller } = require('../../../../controllers/v1/reseller-controller');
const resellerOrdersComissionRoutes = require('./reseller-order-comission-routes');

const authorizationMiddleware = require('../../../middlewares/authorization-middleware');

router.post('/', createReseller);
router.get('/profile', [authorizationMiddleware], getReseller);
router.use('/order-comissions', [authorizationMiddleware], resellerOrdersComissionRoutes);

module.exports = router;