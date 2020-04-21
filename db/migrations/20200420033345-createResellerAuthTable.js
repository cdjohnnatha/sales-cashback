const AuthDataType = require('../models/data-types/auth-data-types');
const createUpdateTimestampDataTypes = require('../models/data-types/create-update-timestamp-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('auth', createUpdateTimestampDataTypes(AuthDataType));
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('auth');
  }
};
