const { Op } = require('sequelize');
const { ResellerOrderComissions } = require('../../../db/models');
const logger = require('../../config/logger');

const createOrderComission = async ({ total_shopping_amount, reseller_id, shopping_code }) => {
  try {
    const resellerOrderComission = await ResellerOrderComissions.create({
      total_shopping_amount,
      reseller_id,
      shopping_code,
    });
    logger.systemLogLevel({
      meta: {
        function: 'createOrderComission',
        resellerOrderComission,
      },
    });
    return resellerOrderComission;
  } catch (error) {
    logger.systemLogLevel({ error, meta: { function: 'createOrderComission' }, level: 'error' });
    throw error;
  }
};

const listOrderComissions = async ({ reseller_id }) => {
  try {
    const resellerOrderComissionList = await ResellerOrderComissions.findAndCountAll({
      where: {
        reseller_id,
      },
      raw: true,
    });
    logger.systemLogLevel({
      meta: {
        function: 'createOrderComission',
        resellerOrderComissionList,
      },
    });
    return resellerOrderComissionList;
  } catch (error) {
    logger.systemLogLevel({ error, meta: { function: 'listOrderComissions' }, level: 'error' });
    throw error;
  }
};

module.exports = {
  createOrderComission,
  listOrderComissions,
};
