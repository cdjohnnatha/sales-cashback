const chai = require('chai');

const { expect } = chai;

const shouldBehaveLikeProductsList = ({ products }) => {
  expect(products).to.be.an('Array');
  expect(products).to.be.lengthOf.above(0);
  expect(products[0]).to.have.a.property('id');
  expect(products[0]).to.have.a.property('name');
  expect(products[0]).to.have.a.property('price');
  
  expect(products[0].id).to.not.be.undefined;
  expect(products[0].name).to.not.be.undefined;
  expect(products[0].price).to.not.be.undefined;
};

module.exports = {
  shouldBehaveLikeProductsList,
}