const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      'resellers',
      [
        {
          email: 'claudio@example.com',
          password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(10)),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          cpf: '12345678912',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('resellers', null, {}),
};
