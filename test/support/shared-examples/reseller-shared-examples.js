const chai = require('chai');

const { expect } = chai;

const shouldBehaveLikeReseller = (object) => {
  expect(object).to.have.a.property('id');
  expect(object).to.have.a.property('first_name');
  expect(object).to.have.a.property('last_name');
  expect(object).to.have.a.property('cpf');
  
  expect(object.id).to.not.be.undefined;
  expect(object.first_name).to.not.be.undefined;
  expect(object.last_name).to.not.be.undefined;
  expect(object.cpf).to.not.be.undefined;
};

module.exports = {
  shouldBehaveLikeReseller,
}