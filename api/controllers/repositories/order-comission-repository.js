const { ResellerOrderComissions } = require('../../../db/models');
const logger = require('../../config/logger');
const { buildPagination } = require('../../helpers/pagination-helpers');

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

const listOrderComissions = async ({ reseller_id, pagination }) => {
  try {
    let { rowsPerPage = 5, currentPage = 0 } = pagination;
    rowsPerPage = parseInt(rowsPerPage, 10);
    currentPage = parseInt(currentPage, 10);
    const resellerOrderComissionList = await ResellerOrderComissions.findAndCountAll({
      limit: rowsPerPage,
      offset: rowsPerPage * currentPage,
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
    const paginationParams = buildPagination({ rowsPerPage, currentPage, totalValues: resellerOrderComissionList.count });
    return {
      reseller_order_comissions: resellerOrderComissionList.rows,
      pagination: paginationParams,
    };
  } catch (error) {
    logger.systemLogLevel({ error, meta: { function: 'listOrderComissions' }, level: 'error' });
    throw error;
  }
};

module.exports = {
  createOrderComission,
  listOrderComissions,
};
