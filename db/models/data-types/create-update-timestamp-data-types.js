const { DATE } = require('sequelize');

module.exports = (dataTypes) => ({
  ...dataTypes,
  created_at: {
    allowNull: false,
    type: DATE,
  },
  updated_at: {
    allowNull: false,
    type: DATE,
  },
});