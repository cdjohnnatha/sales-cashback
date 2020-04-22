const CartItemsDataTypes = require('../models/data-types/cart/cart-items-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('cart_items', CartItemsDataTypes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('cart_items');
  }
};
