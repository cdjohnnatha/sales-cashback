const { object, string, number } = require('yup');

const productOrderSchema = object().shape({
  id: number().required(),
  qty_product: number().required(),
});

module.exports = {
  productOrderSchema,
};
