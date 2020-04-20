const { object, string } = require('yup');

const createResellerSchema = object().shape({
  first_name: string().required(),
  last_name: string().required(),
  cpf: string().required().min(11).max(14)
});

module.exports = {
  createResellerSchema,
};
