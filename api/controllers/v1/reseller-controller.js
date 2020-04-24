const { houstonClientErrors } = require('houston-errors');
const { createResellerSchema } = require('./schemas/reseller-schemas');
const { Resellers } = require('../../../db/models');
const { getAccumulatedCashback } = require('../../services/accumulated-cashback-service');
const logger = require('../../config/logger');

const { BAD_REQUEST } = houstonClientErrors;

const createReseller = async ({ body }, response) => {
  try {
    const isParamsValid = await createResellerSchema.validate(body);
    if (isParamsValid) {
      const reseller = await Resellers.create(body);
      logger.systemLogLevel({ reseller: reseller.dataValues, function: 'createReseller' });
      response.status(201).send(reseller);
    }
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

const getReseller = async ({ meta }, response) => {
  try {
    const reseller = await Resellers.findByPk(meta.reseller_id, {
      attributes: ['id', 'first_name', 'last_name', 'cpf', 'email'],
      raw: true,
    });
    logger.systemLogLevel({
      meta: {
        function: 'getReseller',
        reseller,
      },
    });
    response.status(200).send({ ...reseller });
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

const resellerAccumulatedCashback = async ({ meta }, response) => {
  try {
    const reseller = await Resellers.findByPk(meta.reseller_id, {
      attributes: ['cpf'],
      raw: true,
    });
    logger.systemLogLevel({
      meta: {
        function: 'resellerAccumulatedCashback',
        reseller,
      },
    });
    const { credit } = await getAccumulatedCashback({ cpf: reseller.cpf });
    logger.systemLogLevel({
      meta: {
        function: 'resellerAccumulatedCashback',
        credit,
      },
    });
    response.status(200).send({ credit });
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error.message);
  }
};

module.exports = {
  createReseller,
  getReseller,
  resellerAccumulatedCashback,
};
