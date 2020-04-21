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

const getReseller = async ({ meta }, response) => {
  try {
    const reseller = await Reseller.findByPk(meta.reseller_id, {
      attributes: ['id', 'first_name', 'last_name', 'cpf'],
      include: [{ model: Auth, attributes: ['email'] }],
    });
    logger.systemLogLevel({
      meta: {
        function: 'getReseller',
        reseller,
      },
    });
    response.status(200).send({ reseller });
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

module.exports = {
  createReseller,
  getReseller,
};
