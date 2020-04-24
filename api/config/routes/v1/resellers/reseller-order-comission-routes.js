const express = require('express');
const router = express.Router();
const { createOrderComissionController, listOrderComissionController } = require('../../../../controllers/v1/reseller-order-comissions-controller');

router.post('/', createOrderComissionController);
router.get('/', listOrderComissionController);

module.exports = router;