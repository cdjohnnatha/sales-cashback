const express = require('express');
const resellerRoutes = require('./reseller-routes');

const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/resellers', resellerRoutes);

module.exports = router;
