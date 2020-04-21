const ResellerDataTypes = require('./data-types/reseller-data-types');
const ModelSettings = require('../config/model-settings');
const { normalize } = require('../../api/helpers/format-helper');

module.exports = (db) => {
  const Reseller = db.define('Reseller', ResellerDataTypes, {
    ...ModelSettings,
    tableName: 'reseller',
    hooks: {
      beforeCreate: ({ dataValues }, _options) => {
        dataValues = Reseller.normalizeParams(dataValues);
        return dataValues;
      },
      beforeUpdate: ({ dataValues }, _options) => {
        dataValues = Reseller.normalizeParams(dataValues);

        return dataValues;
      },
    },
  });
  Reseller.normalizeParams = (params) => {
    const { first_name, last_name, cpf } = params;
    params.first_name = normalize(first_name);
    params.last_name = normalize(last_name);
    params.cpf = normalize(cpf);

    return params;
  };
  Reseller.associate = ({ Auth }) => {
    Reseller.belongsTo(Auth);
  };

  return Reseller;
};
