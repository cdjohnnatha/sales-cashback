const { INTEGER, DATE } = require('sequelize');
const createUpdateTimestampDataTypes = require('./create-update-timestamp-data-types');

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
  ...createUpdateTimestampDataTypes,
  deleted_at: {
    allowNull: true,
    type: DATE,
  },
};
