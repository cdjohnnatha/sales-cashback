const { INTEGER, DOUBLE, DATE, ENUM } = require('sequelize');

module.exports = ({
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
    defaultValue: 0.00,
    validate: { min: 0.00 }
  },
  status: {
    type: ENUM,
    values: ['OPEN', 'PURCHASED'],
    allowNull: false,
    defaultValue: 'OPEN'
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
});
