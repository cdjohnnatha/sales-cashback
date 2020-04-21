const chai = require('chai');
const chaiHttp = require('chai-http');
const { houstonClientErrors } = require('houston-errors');

const app = require('../../../app');
const { baseApiRoute } = require('../../support/helpers/request-helpers');
const Factory = require('../../factory');
const {
  shouldBehaveLikeReseller,
} = require('../../support/shared-examples/reseller-shared-examples');
const { authenticateUser } = require('../../support/helpers/request-helpers');

chai.use(chaiHttp);
const { expect } = chai;
const { BAD_REQUEST } = houstonClientErrors;

const resellerBaseRoute = `${baseApiRoute}resellers/`;

let resellerParams = null;
let authParams = null;
let reseller = null;

describe('Reseller-controller', () => {
  after(async () => {
    await Factory.cleanUp('Reseller');
  });
  describe('Register reseller', () => {
    beforeEach(async () => {
      resellerParams = Factory.build('Reseller');
      authParams = Factory.build('Auth');
      [resellerParams, authParams] = await Promise.all([resellerParams, authParams]);
      resellerParams.Auth = authParams;
    });

    describe('with success params', () => {
      it(`create reseller with right params should return a created reseller`, async () => {
        resellerParams.Auth = authParams;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        console.log(response);
        expect(response.statusCode).to.equal(201);
        const { body } = response;
        shouldBehaveLikeReseller(body);
      });
      it(`create reseller with special characters, should create but without them`, async () => {
        const firstName = resellerParams.first_name;
        const lastName = resellerParams.first_name;
        resellerParams.first_name = `!@#$%^&*()${firstName}`;
        resellerParams.last_name = `!@#$%^&*()${lastName}`;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(201);
        const { body } = response;
        expect(body.first_name).to.be.eq(firstName);
        expect(body.last_name).to.be.eq(lastName);
      });
    });
    describe('with wrong params', () => {
      it(`create reseller without first_name, should return an error`, async () => {
        delete resellerParams.first_name;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(BAD_REQUEST.code);
      });
      it(`create reseller without last_name, should return an error`, async () => {
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
      it(`create reseller without email, should return an error`, async () => {
        delete resellerParams.Auth.email;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(BAD_REQUEST.code);
      });
      it(`create reseller without password, should return an error`, async () => {
        delete resellerParams.Auth.password;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(BAD_REQUEST.code);
      });
      it(`create reseller without Auth, should return an error`, async () => {
        delete resellerParams.Auth;
        const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
        expect(response.statusCode).to.equal(BAD_REQUEST.code);
      });
    });
  });

  describe('GET reseller', () => {
    before(async () => {
      authParams = await Factory.build('Auth');
      resellerParams.Auth = authParams;
      const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
      expect(response.statusCode).to.eq(201);
      reseller = response.body;
      reseller.Auth = authParams;
    });
    describe('Authorized reseller', () => {
      it('get profile with authorized token should return a reseller info', async () => {
        const bearerToken = await authenticateUser({ app, chai, email: reseller.Auth.email });
        expect(bearerToken).to.include('Bearer ');
        const response = await chai
          .request(app)
          .get(`${resellerBaseRoute}profile`)
          .set('Authorization', bearerToken);
        expect(response.statusCode).to.eq(200);
      });
    });
    describe('Unauthorized reseller', () => {
      it('get profile without token should return 401', async () => {
        const response = await chai
          .request(app)
          .get(`${resellerBaseRoute}profile`);
        expect(response.statusCode).to.eq(401);
      });
    });
  });
});
