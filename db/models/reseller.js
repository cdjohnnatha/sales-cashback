const ResellerDataTypes = require('./data-types/reseller-data-types');
const ModelSettings = require('../config/model-settings');
const { normalize } = require('../../api/helpers/format-helpers');
const bcrypt = require('bcrypt');

module.exports = (db) => {
  const Reseller = db.define('Resellers', ResellerDataTypes, {
    ...ModelSettings,
    tableName: 'resellers',
    hooks: {
      beforeCreate: ({ dataValues }, _options) => {
        dataValues = Reseller.normalizeParams(dataValues);
        dataValues.password = bcrypt.hashSync(dataValues.password, bcrypt.genSaltSync(10));
        return dataValues;
      },
      afterCreate: ({ dataValues }, _options) => {
        delete dataValues.password;

        return dataValues;
      }
    },
  });
  Reseller.normalizeParams = (params) => {
    const { first_name, last_name, cpf } = params;
    params.first_name = normalize(first_name);
    params.last_name = normalize(last_name);
    params.cpf = normalize(cpf);

    return params;
  };
  Reseller.isPasswordValid = async ({ email, password }) => {
    const auth = await Reseller.findOne({
      where: { email },
      attributes: ['password'],
      raw: true,
    });
    if (auth) {
      return bcrypt.compare(password, auth.password);
    }
    return false;
  };

  Reseller.associate = ({ Resellers, ResellerOrderComissions }) => {
    Resellers.hasMany(ResellerOrderComissions, { foreignKey: 'reseller_id' });
  };

  return Reseller;
};
