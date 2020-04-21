const { name, internet } = require('faker');
const { Reseller } = require('../../db/models');

const hooks = {
  afterBuild: (model, _attrs) => {
    const { dataValues } = model;
    delete dataValues.id;
    return dataValues;
  },
};

const ResellerFactory = (factory) => {
  factory.define('Reseller', Reseller, buildAttributes => {
    const attributes = {
      first_name: () => name.firstName(),
      last_name: () => name.lastName(),
      cpf: () => '00011100011',
    };
    if (buildAttributes.with_auth) {
      attributes.Auth = factory.assoc('Auth', 'auth_id');
    }
    return attributes;
  }, hooks);
};

module.exports = ResellerFactory;
