const { factory } = require('factory-girl');

require('./reseller-factory')(factory);
require('./reseller-order-comission-factory')(factory);

module.exports = factory;