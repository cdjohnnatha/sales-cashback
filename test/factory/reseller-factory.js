const { name, internet, random } = require('faker');
const { Resellers } = require('../../db/models');

const hooks = {
  afterBuild: (model, _attrs) => {
    const { dataValues } = model;
    return dataValues;
  },
};

const ResellerFactory = (factory) => {
  factory.define(
    'Resellers',
    Resellers,
      {
        first_name: () => name.firstName(),
        last_name: () => name.lastName(),
        cpf: () => random.number({ min: 10000000000, max: 99999999999 }).toString(),
        email: () => internet.email(),
        password: () => '123456789',
      },
    // hooks
  );
};

module.exports = ResellerFactory;
