const { object, string, number } = require('yup');

const createOrderInputSchema = object().shape({
  shopping_code: string().required(),
  total_shopping_amount: number().required().min(1)
});

module.exports = {
  createOrderInputSchema,
};
