const { INTEGER, DATE } = require('sequelize');
const createUpdateTimestampDataTypes = require('../create-update-timestamp-data-types');

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
  ...createUpdateTimestampDataTypes,
  deleted_at: {
    allowNull: true,
    type: DATE
  }
};
