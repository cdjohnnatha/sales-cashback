'use strict';

const ResellerDataTypes = require('../models/data-types/reseller-data-types');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('reseller', ResellerDataTypes),

  down: (queryInterface) => queryInterface.dropTable('reseller'),
};
