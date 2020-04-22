const { INTEGER, DOUBLE, DATE, ENUM } = require('sequelize');
const createUpdateTimestampDataTypes = require('../create-update-timestamp-data-types');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  reseller_id: {
    allowNull: false,
    type: INTEGER
  },
  total_amount: {
    type: DOUBLE,
    allowNull: false,
  },
  status: {
    type: ENUM,
    values: ['OPEN', 'PURCHASED'],
    allowNull: false,
    defaultValue: 'OPEN'
  },
  ...createUpdateTimestampDataTypes,
  deleted_at: {
    allowNull: true,
    type: DATE
  }
};
