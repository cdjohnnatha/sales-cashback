const chai = require('chai');

const { expect } = chai;

const shouldBehaveLikePagination = ({ pagination }) => {
  expect(pagination).to.be.an('Object');
  expect(pagination).to.have.a.property('totalPages');
  expect(pagination).to.have.a.property('totalValues');
  expect(pagination).to.have.a.property('currentPage');
  expect(pagination).to.have.a.property('rowsPerPage');

  expect(pagination.totalPages).to.not.be.undefined;
  expect(pagination.totalValues).to.not.be.undefined;
  expect(pagination.currentPage).to.not.be.undefined;
  expect(pagination.rowsPerPage).to.not.be.undefined;
};

module.exports = {
  shouldBehaveLikePagination,
}