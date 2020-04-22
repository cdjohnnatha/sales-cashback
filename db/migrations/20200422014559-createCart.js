const CartDataTypes = require('../models/data-types/cart/cart-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('carts', CartDataTypes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('carts');
  }
};
