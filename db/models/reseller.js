const { Model } = require('sequelize');
const { objectValues } = require('simple-object-handler');

const ResellerDataTypes = require('./data-types/reseller-data-types');
const ModelSettings = require('../config/model-settings');
const { normalize, formatCpf } = require('../../api/helpers/format-helper');

class Reseller extends Model {}

Reseller.normalizeParams = (params) => {
  const { first_name, last_name, cpf } = params;
  params.first_name = normalize(first_name);
  params.last_name = normalize(last_name);
  params.cpf = normalize(cpf);

  return params;
};

// Reseller.associations = (models) {};

module.exports = (sequelize) =>
  Reseller.init(ResellerDataTypes, {
    ...ModelSettings,
    tableName: 'reseller',
    sequelize,
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
