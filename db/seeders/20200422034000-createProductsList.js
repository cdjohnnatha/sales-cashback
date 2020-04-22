const { commerce, random } = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const productList = [];
    for (let count = 0; count < 10; count++) {
      productList.push({
        name: commerce.productName(),
        price: commerce.price(),
        qty_available: random.number({ min: 1, max: 3 }),
        description: commerce.productMaterial(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    return queryInterface.bulkInsert('products', productList, {});
  },

  down: (queryInterfaceproductList) => queryInterface.bulkDelete('products', null, {}),
};
