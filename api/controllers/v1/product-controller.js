const { houstonClientErrors } = require('houston-errors');
const { addProductsInputSchema } = require('./schemas/order-schemas');
const { Products } = require('../../../db/models');
const logger = require('../../config/logger');

const getProducts = async (_request, response) => {
  try {
    const products = await Products.findAll();
    response.status(200).send({ products });
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

module.exports = {
  getProducts,
};