const { houstonClientErrors } = require('houston-errors');
const { createOrderInputSchema } = require('./schemas/reseller-order-comission-schemas');
const { ResellerOrderComissions, ComissionRules } = require('../../../db/models');
const logger = require('../../config/logger');

const { BAD_REQUEST } = houstonClientErrors;

const createOrderComission = async ({ body, reseller_id }, response) => {
  try {
    const isParamsValid = await createOrderInputSchema.validate(body);
    if (isParamsValid) {
      const cart = Carts.findOrCreate({
        where: {
          reseller_id,
          order_statuses: 'OPEN',
        },
        defaults: {
          reseller_id,
        },
      });
      logger.systemLogLevel({ meta: { cart } });
      const cartItems = await CartItems.findAll({ where: { ...products }, attributes: ['id'] });
      logger.systemLogLevel({ meta: { cartItems } });
      card.addCartItems();
      response.status(201).send(reseller);
    }
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

module.exports = {
  createOrderComission,
};
