const { INTEGER, STRING, DATE } = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  email: {
    type: STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  deleted_at: {
    allowNull: true,
    type: DATE
  }
};
