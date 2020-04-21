const { internet } = require('faker');
const { Auth } = require('../../db/models');

const hooks = {
  afterBuild: (model, _attrs) => {
    const { dataValues } = model;
    delete dataValues.id;
    delete dataValues.created_at;
    delete dataValues.updated_at;
    return dataValues;
  },
};

const AuthFactory = (factory) => {
  factory.define(
    'Auth',
    Auth,
    {
      email: internet.email,
      password: '123456789',
    },
    hooks
  );
};

module.exports = AuthFactory;
