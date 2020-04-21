const { factory } = require('factory-girl');

require('./auth-factory')(factory);
require('./reseller-factory')(factory);

module.exports = factory;