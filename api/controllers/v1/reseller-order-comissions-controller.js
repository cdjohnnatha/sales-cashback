const { houstonClientErrors } = require('houston-errors');
const { createOrderInputSchema } = require('./schemas/reseller-order-comission-schemas');
const orderComissionRepository = require('../repositories/order-comission-repository');
const logger = require('../../config/logger');

const { BAD_REQUEST } = houstonClientErrors;

const createOrderComissionController = async ({ body, meta }, response) => {
  try {
    const isParamsValid = await createOrderInputSchema.validate(body);
    if (isParamsValid) {
      const orderComission = await orderComissionRepository.createOrderComission({
        ...body,
        reseller_id: meta.reseller_id,
      });
      response.status(201).send(orderComission);
    }
  } catch (error) {
    logger.systemLogLevel({
      error,
      meta: { function: 'createOrderComissionController' },
      level: 'error',
    });
    response.status(BAD_REQUEST.code).send(error);
  }
};

const listOrderComissionController = async ({ meta }, response) => {
  try {
      const order_comissions = await orderComissionRepository.listOrderComissions({
        reseller_id: meta.reseller_id,
      });
      console.log('[order_comissions]', order_comissions);
    response.status(201).send({ order_comissions });
  } catch (error) {
    logger.systemLogLevel({
      error,
      meta: { function: 'createOrderComissionController' },
      level: 'error',
    });
    response.status(BAD_REQUEST.code).send(error);
  }
};

module.exports = {
  createOrderComissionController,
  listOrderComissionController,
};
