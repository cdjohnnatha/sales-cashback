const OrderProductsDataTypes = require('../models/data-types/order-products-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('order_products', OrderProductsDataTypes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('order_products');
  }
};
