'use strict';

const ResellerDataTypes = require('../models/data-types/reseller-data-types');
const createUpdateTimestampDataTypes = require('../models/data-types/create-update-timestamp-data-types');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('reseller', createUpdateTimestampDataTypes(ResellerDataTypes)),

  down: (queryInterface) => queryInterface.dropTable('reseller'),
};
