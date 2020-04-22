const { INTEGER, STRING, DATE, DOUBLE, TEXT } = require('sequelize');
const createUpdateTimestampDataTypes = require('./create-update-timestamp-data-types');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  name: {
    type: STRING(100),
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  qty_available: {
    type: INTEGER,
    allowNull: false,
  },
  price: {
    type: DOUBLE,
    allowNull: false,
  },
  ...createUpdateTimestampDataTypes,
  deleted_at: {
    allowNull: true,
    type: DATE,
  },
};
