const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../../middlewares/authorization-middleware');
const { getProducts } = require('../../../controllers/v1/product-controller');

router.get('/', [authorizationMiddleware], getProducts);

module.exports = router;