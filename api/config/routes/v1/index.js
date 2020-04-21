const express = require('express');
const resellerRoutes = require('./reseller-routes');
const authRoutes = require('./auth-routes');

const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/resellers', resellerRoutes);
router.use('/auth', authRoutes);

module.exports = router;
