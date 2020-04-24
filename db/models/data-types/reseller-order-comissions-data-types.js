const { INTEGER, ENUM, DATE, DOUBLE, TEXT } = require('sequelize');

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
  comission_rules_id: {
    allowNull: false,
    type: INTEGER,
  },
  shopping_code: {
    allowNull: false,
    type: INTEGER,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  order_statuses: {
    type: ENUM,
    values: ['WAITING_APPROVAL', 'APPROVED'],
    allowNull: false,
    defaultValue: 'WAITING_APPROVAL'
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