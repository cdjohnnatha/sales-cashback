const { houstonClientErrors } = require('houston-errors');
const { authEmailSchema } = require('./auth-controller-schema');
const { Auth } = require('../../../../db/models');
const logger = require('../../../config/logger');
const { generateJWT } = require('../../../helpers/jwt-generator');
const { BAD_REQUEST } = houstonClientErrors;

const authEmailProvider = async ({ body }, response) => {
  try {
    const isParamsValid = await authEmailSchema.validate(body);
    if (isParamsValid) {
      const isPasswordValid = await Auth.isPasswordValid(body);
      if (isPasswordValid) {
        const auth = await Auth.findOne({
          where: { email: body.email },
          attributes: ['id'],
          raw: true
        });
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
