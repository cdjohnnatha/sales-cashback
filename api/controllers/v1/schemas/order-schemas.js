const { object, string, array } = require('yup');
const { cpfSchema } = require('./reseller-schemas');
const { productOrderSchema } = require('./product-schema');

const addProductsInputSchema = object().shape({
  products: array(productOrderSchema).required(),
});

module.exports = {
  addProductsInputSchema,
};
