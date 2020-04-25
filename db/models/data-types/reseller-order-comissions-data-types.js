const { INTEGER, ENUM, DATE, DOUBLE, STRING } = require('sequelize');

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
  shopping_code: {
    allowNull: false,
    type: STRING,
    unique: true,
  },
  total_shopping_amount: {
    type: DOUBLE,
    allowNull: false,
    validate: {
      min: 1.00
    }
  },
  cashback_percentage_used: {
    type: DOUBLE,
    allowNull: false,
    defaultValue: 0.00
  },
  cashback_amount: {
    type: DOUBLE,
    allowNull: false,
    defaultValue: 0.00
  },
  order_statuses: {
    type: ENUM,
    values: ['WAITING_APPROVAL', 'APPROVED'],
    allowNull: false,
    defaultValue: 'WAITING_APPROVAL'
  },
  createdAt: {
    type: DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DATE,
    field: 'updated_at'
  },
  deleted_at: {
    allowNull: true,
    type: DATE,
  },
};
