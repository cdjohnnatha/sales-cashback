const { finance, random } = require('faker');
const { ResellerOrderComissions } = require('../../db/models');

const ResellerFactory = (factory) => {
  factory.define(
    'ResellerOrderComissions',
    ResellerOrderComissions,
    {
      cashback_amount: () => finance.amount(),
      cashback_percentage_applied: 0.10,
      total_shopping_amount: () => finance.amount(),
      shopping_code: () => random.uuid(),
      reseller_id: factory.assoc('Resellers', 'id'),
    },
    // hooks
  );
};

module.exports = ResellerFactory;
