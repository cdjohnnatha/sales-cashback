const { INTEGER, DATE } = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  order_id: {
    allowNull: false,
    type: INTEGER,
  },
  product_id: {
    allowNull: false,
    type: INTEGER,
  },
  qty_products: {
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
    type: DATE,
  },
};
