const express = require('express');
const router = express.Router();
const { createReseller } = require('../../../controllers/v1/reseller/reseller-controller');

router.post('/', createReseller);

module.exports = router;