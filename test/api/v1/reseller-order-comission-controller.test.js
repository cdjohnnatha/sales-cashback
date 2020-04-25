const chai = require('chai');
const chaiHttp = require('chai-http');
const { houstonClientErrors } = require('houston-errors');

const app = require('../../../app');
const { baseApiRoute } = require('../../support/helpers/request-helpers');
const {
  shouldBehaveLikeResellerOrderComission,
  shouldBehaveLikeResellerOrderComissionList,
} = require('../../support/shared-examples/reseller-order-comission-shared-examples');
const {
  shouldBehaveLikePagination,
} = require('../../support/shared-examples/pagination-shared-examples');
const Factory = require('../../factory');
const { authenticateUser } = require('../../support/helpers/request-helpers');

chai.use(chaiHttp);
const { expect } = chai;
const { BAD_REQUEST } = houstonClientErrors;

const resellerBaseRoute = `${baseApiRoute}resellers/`;

let resellerParams = null;
let reseller = null;
let bearerToken = null;
describe('Resellers Order Comissions', () => {
  after(async () => {
    await Factory.cleanUp('Resellers');
  });
  describe('Create an order comission for reseller', () => {
    beforeEach(async () => {
      ({ dataValues: resellerParams } = await Factory.build('Resellers'));
      const response = await chai.request(app).post(resellerBaseRoute).send(resellerParams);
      expect(response.statusCode).to.eq(201);
      reseller = response.body;
      bearerToken = await authenticateUser({ app, chai, email: reseller.email });
      expect(bearerToken).to.include('Bearer ');
    });
    describe('Authorized reseller', () => {
      describe('Create reseller order comissions', () => {
        it('Right params it should return an order comission created', async () => {
          const {
            dataValues: { total_shopping_amount, shopping_code },
          } = await Factory.build('ResellerOrderComissions');
          const response = await chai
            .request(app)
            .post(`${resellerBaseRoute}order-comissions`)
            .set('Authorization', bearerToken)
            .send({ total_shopping_amount, shopping_code });
          expect(response.statusCode).to.eq(201);
          shouldBehaveLikeResellerOrderComission(response.body);
        });
      });
      describe('List reseller order comissions', () => {
        it('Sending empty pagination params it should return an order comission list with 5 items per page.', async () => {
          await Factory.createMany('ResellerOrderComissions', 5, { reseller_id: reseller.id });
          const response = await chai
            .request(app)
            .get(`${resellerBaseRoute}order-comissions`)
            .set('Authorization', bearerToken);
          expect(response.statusCode).to.eq(200);
          shouldBehaveLikeResellerOrderComissionList(response.body);
          expect(response.body.reseller_order_comissions.length).to.be.above(0);
          shouldBehaveLikePagination(response.body);
          expect(response.body.pagination.rowsPerPage).to.be.eq(5);
        });
        it('Sending rowsPerPage = 2 and currentPage 1 at query params it should return an order comission pagination rowsPerPage = 2 and currentPage = 0.', async () => {
          await Factory.createMany('ResellerOrderComissions', 5, { reseller_id: reseller.id });
          const response = await chai
            .request(app)
            .get(`${resellerBaseRoute}order-comissions`)
            .set('Authorization', bearerToken)
            .query({ rowsPerPage: 2, currentPage: 1 });
          expect(response.statusCode).to.eq(200);
          shouldBehaveLikeResellerOrderComissionList(response.body);
          expect(response.body.reseller_order_comissions.length).to.be.above(0);
          shouldBehaveLikePagination(response.body);
          expect(response.body.pagination.rowsPerPage).to.be.eq(2);
          expect(response.body.pagination.currentPage).to.be.eq(1);
        });
      });
    });
    describe('Unauthorized reseller', () => {
      it('create reseller order comissions without token should return 401', async () => {
        const {
          dataValues: { total_shopping_amount, shopping_code },
        } = await Factory.build('ResellerOrderComissions');
        const response = await chai
          .request(app)
          .post(`${resellerBaseRoute}order-comissions`)
          .send({ total_shopping_amount, shopping_code });
        expect(response.statusCode).to.eq(401);
      });
      it('Sending rowsPerPage = 2 and currentPage 1 at query params it should return an order comission pagination rowsPerPage = 2 and currentPage = 0.', async () => {
        await Factory.createMany('ResellerOrderComissions', 5, { reseller_id: reseller.id });
        const response = await chai
          .request(app)
          .get(`${resellerBaseRoute}order-comissions`)
          .query({ rowsPerPage: 2, currentPage: 1 });
          expect(response.statusCode).to.eq(401);
      });
    });
  });
});
