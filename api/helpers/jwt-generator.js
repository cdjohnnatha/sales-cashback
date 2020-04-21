const logger = require('../config/logger');
const jwt = require('jsonwebtoken');

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

module.exports = {
  generateJWT,
}