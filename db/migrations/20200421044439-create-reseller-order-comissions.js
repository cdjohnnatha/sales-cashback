const ResellerOrderComissionsDataTypes = require('../models/data-types/reseller-order-comissions-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('reseller_order_comissions', ResellerOrderComissionsDataTypes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('reseller_order_comissions');
  }
};
