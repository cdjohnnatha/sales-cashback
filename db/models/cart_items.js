const cartItemsDataTypes = require('./data-types/cart/cart-items-data-types');
const ModelSettings = require('../config/model-settings');

module.exports = (db) => {
  const CartItem = db.define('CartItems', cartItemsDataTypes, {
    ...ModelSettings,
    tableName: 'cart_items',
  });
  CartItem.associate = ({ Carts, CartItems }) => {
    CartItems.belongsTo(Carts);
  };
  return CartItem;
};