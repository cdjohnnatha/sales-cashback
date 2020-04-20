const { name, random } = require('faker');
const { factory } = require('factory-girl');

const { Reseller } = require('../../db/models');

const hooks = {
  afterBuild: (model, _attrs) => {
    const { dataValues } = model;
    delete dataValues.id;
    return dataValues;
  },
};
const ResellerFactory = (factory) =>
  factory.define(
    'Reseller',
    Reseller,
    {
      first_name: () => name.firstName(),
      last_name: () => name.lastName(),
      cpf: () => '00011100011',
    },
    hooks
  );

module.exports = ResellerFactory;
