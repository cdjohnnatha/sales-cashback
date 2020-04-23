const ResellerOrderComissionsDataTypes = require('./data-types/reseller-order-comissions-data-types');
const ModelSettings = require('../config/model-settings');

module.exports = (db) => {
  const ResellerOrderComissions = db.define('ResellerOrderComissions', ResellerOrderComissionsDataTypes, {
    ...ModelSettings,
    tableName: 'reseller_order_comissions',
  });
  ResellerOrderComissions.associate = ({ ResellerOrderComissions, ComissionRules, Resellers }) => {
    ResellerOrderComissions.belongsTo(ComissionRules,  { foreignKey: 'comission_rules_id', });
    ResellerOrderComissions.belongsTo(Resellers,  { foreignKey: 'reseller_id', });
  };
  return ResellerOrderComissions;
};