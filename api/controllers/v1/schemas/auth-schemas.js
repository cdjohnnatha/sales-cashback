const { object, string } = require('yup');

const authEmailSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(8),
});

module.exports = {
  authEmailSchema,
};
