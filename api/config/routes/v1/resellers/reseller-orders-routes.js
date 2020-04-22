const express = require('express');
const router = express.Router();
const { addProducts } = require('../../../../controllers/v1/reseller-carts-controller');

router.post('/add-products', addProducts);

module.exports = router;