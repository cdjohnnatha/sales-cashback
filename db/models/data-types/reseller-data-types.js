const {
  INTEGER,
  STRING,
  DATE,
} = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  first_name: {
    allowNull: false,
    type: STRING(70),
  },
  last_name: {
    allowNull: false,
    type: STRING(70),
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
  cpf: {
    allowNull: false,
    type: STRING(11),
    unique: true
  },
  deleted_at: {
    allowNull: true,
    type: DATE,
  },
};