const OrdersDataTypes = require('../models/data-types/order-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('orders', OrdersDataTypes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('orders');
  }
};
