const { object, string } = require('yup');

const cpfSchema = string().required().min(11).max(14);

const createResellerSchema = object().shape({
  first_name: string().required(),
  last_name: string().required(),
  cpf: cpfSchema,
  email: string().required().email(),
  password: string().required().min(8),
});

module.exports = {
  createResellerSchema,
  cpfSchema,
};
