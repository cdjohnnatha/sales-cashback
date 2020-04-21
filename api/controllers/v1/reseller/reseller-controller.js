const { houstonClientErrors } = require('houston-errors');
const { createResellerSchema } = require('./reseller-controller-schemas');
const { Reseller, Auth } = require('../../../../db/models');
const logger = require('../../../config/logger');

const { BAD_REQUEST } = houstonClientErrors;

const createReseller = async ({ body }, response) => {
  try {
    const isParamsValid = await createResellerSchema.validate(body);
    if (isParamsValid) {
      const reseller = await Reseller.create(body, { include: [{ model: Auth }] });
      response.status(201).send(reseller);
    }
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

module.exports = {
  createReseller,
};
