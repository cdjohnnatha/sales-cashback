'use strict';

const ResellerDataTypes = require('../models/data-types/reseller-data-types');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('resellers', ResellerDataTypes),

  down: (queryInterface) => queryInterface.dropTable('resellers'),
};
