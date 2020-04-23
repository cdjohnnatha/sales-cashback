const express = require('express');
const router = express.Router();
const { createOrderComission } = require('../../../../controllers/v1/reseller-order-comissions-controller');

router.post('/', createOrderComission);

module.exports = router;