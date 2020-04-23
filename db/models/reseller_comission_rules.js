const ComissionRulesDataTypes = require('./data-types/comission-rules-data-types');
const ModelSettings = require('../config/model-settings');

module.exports = (db) => {
  const comissionRules = db.define('ComissionRules', ComissionRulesDataTypes, {
    ...ModelSettings,
    tableName: 'comission_rules',
  });
  comissionRules.associate = ({ ComissionRules, ResellerOrderComissions }) => {
    ComissionRules.hasMany(ResellerOrderComissions,  { foreignKey: 'comission_rules_id', });
  };
  return comissionRules;
};