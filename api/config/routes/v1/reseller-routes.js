const express = require('express');
const router = express.Router();
const { createReseller, getReseller } = require('../../../controllers/v1/reseller/reseller-controller');

const authorizationMiddleware = require('../../../config/middlewares/authorization-middleware');

router.post('/', createReseller);
router.get('/profile', [authorizationMiddleware], getReseller);

module.exports = router;