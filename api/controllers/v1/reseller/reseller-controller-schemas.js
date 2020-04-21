const { object, string } = require('yup');

const createResellerSchema = object().shape({
  first_name: string().required(),
  last_name: string().required(),
  cpf: string().required().min(11).max(14),
  Auth: object().shape({
    email: string().required().email(),
    password: string().required().min(8),
  })
});

module.exports = {
  createResellerSchema,
};
