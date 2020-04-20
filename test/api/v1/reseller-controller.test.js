const chai = require('chai');
const chaiHttp = require('chai-http');
const { houstonClientErrors } = require('houston-errors');

const app = require('../../../app');
const { baseApiRoute } = require('../../support/helpers/request-helpers');
const Factory = require('../../factory');
const {
  shouldBehaveLikeReseller,
} = require('../../support/shared-examples/reseller-shared-examples');

chai.use(chaiHttp);
const { expect } = chai;
const { BAD_REQUEST } = houstonClientErrors;

const resellerBaseRoute = `${baseApiRoute}resellers/`;

describe('Reseller-controller', () => {
  describe('Register reseller', () => {
    describe('with success params', () => {
      it(`create reseller with right params should return a created reseller`, async () => {
        const resellerParams = await Factory.build('Reseller');
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(201);
        const { body } = response;

        shouldBehaveLikeReseller(body);
      });
      it(`create reseller with special characters, should create but without them`, async () => {
        const resellerParams = await Factory.build('Reseller');
        const firstName = resellerParams.first_name;
        const lastName = resellerParams.first_name;
        resellerParams.first_name = `!@#$%^&*()${firstName}` 
        resellerParams.last_name = `!@#$%^&*()${lastName}` 
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(201);
        const { body } = response;
        expect(body.first_name).to.be.eq(firstName);
        expect(body.last_name).to.be.eq(lastName);
      });
    });
    describe('with wrong params', () => {
      it(`create reseller without first_name, should return an error`, async () => {
        const resellerParams = await Factory.build('Reseller');
        delete resellerParams.first_name;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(BAD_REQUEST.code);
      });
      it(`create reseller without last_name, should return an error`, async () => {
        const resellerParams = await Factory.build('Reseller');
        delete resellerParams.last_name;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(BAD_REQUEST.code);
      });
      it(`create reseller without cpf, should return an error`, async () => {
        const resellerParams = await Factory.build('Reseller');
        delete resellerParams.cpf;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(BAD_REQUEST.code);
      });
    });
  });
});
