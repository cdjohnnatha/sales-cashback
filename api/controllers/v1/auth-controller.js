const { houstonClientErrors } = require('houston-errors');
const { authEmailSchema } = require('./schemas/auth-schemas');
const { Resellers } = require('../../../db/models');
const logger = require('../../config/logger');
const { generateJWT } = require('../../helpers/token-helpers');
const { BAD_REQUEST } = houstonClientErrors;

const authEmailProvider = async ({ body }, response) => {
  try {
    const isParamsValid = await authEmailSchema.validate(body);
    if (isParamsValid) {
      const isPasswordValid = await Resellers.isPasswordValid(body);
      if (isPasswordValid) {
        const auth = await Resellers.findOne({
          where: { email: body.email },
          attributes: ['id'],
          raw: true
        });
        logger.systemLogLevel({ meta: { auth, function: 'authEmailProvider' } });
        const jwt = await generateJWT({ reseller_id: auth.id });
        response.status(200).send(jwt);
      } else {
        response.status(BAD_REQUEST.code).send('Invalid email or password');
      }
    }
  } catch (error) {
    logger.systemLogLevel({ error, level: 'error' });
    response.status(BAD_REQUEST.code).send(error);
  }
};

module.exports = {
  authEmailProvider,
};
