const express = require('express');
const router = express.Router();
const { authEmailProvider } = require('../../../controllers/v1/auth-controller');

router.post('/', authEmailProvider);

module.exports = router;