const logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const { INVALID_TOKEN, EXPIRED_TOKEN } = require('houston-errors').apollo13;

/**
 * @function generateJWT
 * @description It will encrypt the params using a TOKEN_SECRET and it will create an
 * expiration days based on TOKEN_EXPIRATION_DAYS or as default 1 day.
 * @param {Object} params - Params to be used in token. 
 */
const generateJWT = async (params) => {
  try {
    const exp = new Date();
    const expirationTokenTime = process.env.TOKEN_EXPIRATION_DAYS || 1;
    exp.setDate(`${exp.getDate()}${expirationTokenTime}`);
    const generatedToken = jwt.sign(params, process.env.TOKEN_SECRET, {
      expiresIn: `${expirationTokenTime}d`,
    });
    if (generatedToken instanceof Error) {
      throw generatedToken;
    }
    return { jwt: generatedToken };
  } catch (error) {
    error.message = [...error.message, 'jwt error generation'];
    logger.systemLogLevel({ level: 'error', error });
    throw new Error({ message: error.message });
  }
};

/**
 * @function decodeToken
 * @description It will use the library jwt for decode a token.
 * @param {String} token 
 */
const decodeToken = (token) =>
  new Promise((resolve) => {
    const decodedToken = {
      success: true,
      decoded: null,
      error: null,
    };

    jwt.verify(token, process.env.TOKEN_SECRET, async (jwtError, decodedJwt) => {
      if (!jwtError) {
        decodedToken.decoded = decodedJwt;
        resolve(decodedToken);
      } else if (jwtError && jwtError.name === 'TokenExpiredError') {
        decodedToken.error = {
          status: EXPIRED_TOKEN.code,
          message: EXPIRED_TOKEN.string,
        };
        decodedToken.success = false;
        resolve(decodedToken);
      } else {
        decodedToken.error = {
          status: INVALID_TOKEN.code,
          message: INVALID_TOKEN.string,
        };
        decodedToken.success = false;
        resolve(decodedToken);
      }
    });
  });

/**
 * @function extractTokenFromHeader
 * @description It will extract the keyword Bearer and return the real token value
 * @param {Object} headers
 * @param {String} headers.authorization
 */
const getBearerTokenFromHeader = ({ authorization }) => {
  if (authorization) return authorization.slice(7).trim();
  else return authorization;
};

module.exports = {
  generateJWT,
  decodeToken,
  getBearerTokenFromHeader,
};
