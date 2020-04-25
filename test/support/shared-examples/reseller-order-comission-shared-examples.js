const chai = require('chai');

const { expect } = chai;

const shouldBehaveLikeResellerOrderComission = (resellerOrderComission) => {
  expect(resellerOrderComission).to.be.an('Object');
  expect(resellerOrderComission).to.have.a.property('cashback_percentage_used');
  expect(resellerOrderComission).to.have.a.property('cashback_amount');
  expect(resellerOrderComission).to.have.a.property('order_statuses');
  expect(resellerOrderComission).to.have.a.property('id');
  expect(resellerOrderComission).to.have.a.property('total_shopping_amount');
  expect(resellerOrderComission).to.have.a.property('reseller_id');
  expect(resellerOrderComission).to.have.a.property('shopping_code');
  expect(resellerOrderComission).to.have.a.property('createdAt');
  expect(resellerOrderComission).to.have.a.property('updatedAt');

  expect(resellerOrderComission.cashback_percentage_used).to.not.be.undefined;
  expect(resellerOrderComission.cashback_amount).to.not.be.undefined;
  expect(resellerOrderComission.order_statuses).to.not.be.undefined;
  expect(resellerOrderComission.id).to.not.be.undefined;
  expect(resellerOrderComission.total_shopping_amount).to.not.be.undefined;
  expect(resellerOrderComission.reseller_id).to.not.be.undefined;
  expect(resellerOrderComission.shopping_code).to.not.be.undefined;
  expect(resellerOrderComission.createdAt).to.not.be.undefined;
  expect(resellerOrderComission.updatedAt).to.not.be.undefined;
};

const shouldBehaveLikeResellerOrderComissionList = ({ reseller_order_comissions }) => {
  reseller_order_comissions.forEach((resellerOrderComission) => {
    shouldBehaveLikeResellerOrderComission(resellerOrderComission);
  })
};

module.exports = {
  shouldBehaveLikeResellerOrderComission,
  shouldBehaveLikeResellerOrderComissionList,
}