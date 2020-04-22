const { houstonServerErrors, apollo13 } = require('houston-errors');
const { decodeToken, getBearerTokenFromHeader } = require('../../helpers/token-helpers');
const { Resellers } = require('../../../db/models');

const logger = require('../logger');
/**
 * This method is an express middleware responsible for authorize all
 * the private requests from the API.
 * It's gonna authorize checking the JWT token sent on headers.
 * @function authorizationMiddleware
 * @param {object} request Http request
 * @param {object} response Response object
 * @param {function} next Express next() function
 * @returns {object} Http response with status and message in case of unauthorized request
 * or next() when the request is authorized or not belongs to employee.
 */
const authorizationMiddleware = async (request, response, next) => {
  try {
    const token = await getBearerTokenFromHeader(request.headers);
    const { success, decoded, error } = await decodeToken(token);
    logger.systemLogLevel({
      meta: {
        action: 'decodeToken',
        decoded,
      },
    });
    if (success) {
      request.meta = {
        reseller_id: decoded.reseller_id
      };
      next();
    } else {
      logger.systemLogLevel({
        error,
        meta: {
          token,
        },
      });
      response.status(error.status).send(error.message);
    }
  } catch (error) {
    logger.systemLogLevel({
      error,
      level: 'error',
      meta: {
        function: 'authorizationMiddleware',
        additional_message: 'API Authorization route',
      },
    });
    response
      .status(error.status || houstonServerErrors.INTERNAL_SERVER_ERROR.code)
      .send(error.message || 'Server was unable to verify the session');
  }
};

module.exports = authorizationMiddleware;
