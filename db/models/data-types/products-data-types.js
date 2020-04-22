const { INTEGER, STRING, DATE, DOUBLE, TEXT } = require('sequelize');

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
