const { INTEGER, DATE } = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  cart_id: {
    allowNull: false,
    type: INTEGER
  },
  product_id: {
    type: INTEGER,
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DATE,
  },
  updated_at: {
    type: DATE,
  },
  deleted_at: {
    allowNull: true,
    type: DATE
  }
};
