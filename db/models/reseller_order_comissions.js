const ResellerOrderComissionsDataTypes = require('./data-types/reseller-order-comissions-data-types');
const ModelSettings = require('../config/model-settings');

module.exports = (db) => {
  const ResellerOrderComissions = db.define(
    'ResellerOrderComissions',
    ResellerOrderComissionsDataTypes,
    {
      ...ModelSettings,
      tableName: 'reseller_order_comissions',
      hooks: {
        beforeCreate: async ({ dataValues, sequelize: { models } }) => {
          const logger = require('../../api/config/logger/index');
          const {
            cashback_amount,
            cashback_percentage_used,
          } = models.ResellerOrderComissions.calculateCashback(dataValues.total_shopping_amount);
          dataValues.cashback_amount = cashback_amount;
          dataValues.cashback_percentage_used = cashback_percentage_used;
          logger.systemLogLevel({
            meta: {
              function: 'ResellerOrderComissionModel - beforeCreate',
              ResellerOrderComissions: dataValues,
            },
          });
          const reseller = await models.Resellers.findByPk(dataValues.reseller_id, {
            attributes: ['cpf'],
            raw: true,
          });

          logger.systemLogLevel({
            meta: {
              function: 'ResellerOrderComissionModel - beforeCreate',
              reseller,
            },
          });

          if (reseller.cpf === '15350946056') {
            dataValues.order_statuses = 'APPROVED';
          }

          logger.systemLogLevel({
            meta: {
              function: 'ResellerOrderComissionModel - beforeCreate',
              ResellerOrderComissions: dataValues,
            },
          });
          return dataValues;
        },
      },
    }
  );

  ResellerOrderComissions.calculateCashback = (amount) => {
    let cashback_percentage_used = 0.0;
    if (amount > 0 && amount <= 1000) {
      cashback_percentage_used = 0.1;
    } else if (amount >= 1000 && amount <= 1500) {
      cashback_percentage_used = 0.15;
    } else if (amount >= 1500) {
      cashback_percentage_used = 0.2;
    }

    const cashback_amount = amount * cashback_percentage_used;

    return { cashback_percentage_used, cashback_amount };
  };

  ResellerOrderComissions.associate = ({ ResellerOrderComissions, Resellers }) => {
    ResellerOrderComissions.belongsTo(Resellers, { foreignKey: 'reseller_id' });
  };
  return ResellerOrderComissions;
};
