const { houstonClientErrors } = require('houston-errors');
const { addProductsInputSchema } = require('./schemas/order-schemas');
const { Resellers, Orders } = require('../../../db/models');
const logger = require('../../config/logger');

const { BAD_REQUEST } = houstonClientErrors;

const addProducts = async ({ body, reseller_id }, response) => {
  try {
    const isParamsValid = await addProductsInputSchema.validate(body);
    if (isParamsValid) {
      const order = Order.findOrCreate({
        where: {
          reseller_id,
          order_statuses: 'WAITING_APPROVAL',
        },
        defaults: {
          
        },
      });
      response.status(201).send(reseller);
    }
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

module.exports = {
  addProducts,
};
