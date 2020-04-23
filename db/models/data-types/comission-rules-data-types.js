const { INTEGER, DATE, DOUBLE } = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  reseller_id: {
    allowNull: false,
    type: INTEGER,
  },
  min_amount: {
    allowNull: false,
    type: DOUBLE,
  },
  max_amount: {
    allowNull: false,
    type: DOUBLE,
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
