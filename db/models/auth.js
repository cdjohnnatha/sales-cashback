const bcrypt = require('bcrypt');

const AuthDataTypes = require('./data-types/auth-data-types');
const ModelSettings = require('../config/model-settings');

module.exports = (db) => {
  const Auth = db.define('Auth', AuthDataTypes, {
    ...ModelSettings,
    tableName: 'auth',
    hooks: {
      beforeCreate: ({ dataValues }, _options) => {
        dataValues.password = bcrypt.hashSync(dataValues.password, bcrypt.genSaltSync(10));
        return dataValues;
      },
      afterCreate: ({ dataValues }, _options) => {
        delete dataValues.id;
        delete dataValues.password;
      },
    },
  });
  Auth.isPasswordValid = async ({ email, password }) => {
    const auth = await Auth.findOne({
      where: { email },
      attributes: ['password'],
      raw: true,
    });
    if (auth) {
      return bcrypt.compare(password, auth.password);
    }
    return false;
  };

  return Auth;
};
