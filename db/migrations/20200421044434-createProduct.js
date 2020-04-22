const ProductsDataTypes = require('../models/data-types/products-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('products', ProductsDataTypes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('products');
  }
};
