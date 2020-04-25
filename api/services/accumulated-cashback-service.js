const axios = require('axios');
const DEFAULT_CASHBACK_BASE_URL =
  'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=';
const logger = require('../../api/config/logger');

/**
 * @function getAccumulatedCashback
 * @description It will get from a third party service an accumulated cashback from
 * an cpf number.
 * @param {Object} param
 * @param {Number|String} param.cpf - Reseller cpf
 * @returns {Object} credit.
 */
const getAccumulatedCashback = async ({ cpf = 12312312323 }) => {
  try {
    let baseUrl = process.env.ACCUMULATED_CASHBACK_SERVICE_BASE_URL || DEFAULT_CASHBACK_BASE_URL;
    const headers = {
      token: process.env.ACCUMULATED_CASHBACK_SERVICE_TOKEN || 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm',
    };
    const { data } = await axios.get(`${baseUrl}${cpf}`, { headers });
    logger.systemLogLevel({
      meta: {
        function: 'getAccumulatedCashback',
        serviceResponse: data,
        cpf,
      },
    });
    if (data.statusCode === 200) {
      return data.body;
    }
    throw new Error(data.body.message);
  } catch (error) {
    logger.systemLogLevel({
      error,
      meta: { function: 'getAccumulatedCashback' },
      level: 'error',
    });
    throw error;
  }
};

module.exports = {
  getAccumulatedCashback,
};
