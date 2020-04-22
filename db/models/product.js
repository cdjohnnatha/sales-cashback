const productsDataTypes = require('./data-types/products-data-types');
const ModelSettings = require('../config/model-settings');

module.exports = (db) => {
  const CartItem = db.define('Products', productsDataTypes, {
    ...ModelSettings,
    tableName: 'products',
  });
  CartItem.associate = () => {};
  return CartItem;
};