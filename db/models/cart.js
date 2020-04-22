const cartDataTypes = require('./data-types/cart/cart-data-types');
const ModelSettings = require('../config/model-settings');

module.exports = (db) => {
  const Cart = db.define('Carts', cartDataTypes, {
    ...ModelSettings,
    tableName: 'carts',
  });
  Cart.associate = ({ Carts, CartItems }) => {
    Carts.hasMany(CartItems,  { foreignKey: 'cart_id', });
  };
  return Cart;
};