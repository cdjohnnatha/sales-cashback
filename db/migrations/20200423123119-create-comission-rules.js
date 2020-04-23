const ComissionRulesDataTypes = require('../models/data-types/comission-rules-data-types');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('comission_rules', ComissionRulesDataTypes);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('comission_rules');
  }
};
