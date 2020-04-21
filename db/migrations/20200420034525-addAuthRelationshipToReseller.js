'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.addColumn('reseller', 'auth_id', {
      type: 'integer',
      required: true,
      index: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('reseller', 'auth_id'),
};
