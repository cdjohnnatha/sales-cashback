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
let reseller = null;
let bearerToken = null;

describe('Carts-controller', () => {
  after(async () => {
    await Factory.cleanUp('Resellers');
  });
  describe('Register reseller', () => {
    beforeEach(async () => {
      ({ dataValues: reseller } = await Factory.create('Resellers'));
      bearerToken = await authenticateUser({ app, chai, email: reseller.email });
    });

    describe('authenticated User', () => {
      it(`Add products to a cart it should return a list of added products.`, async () => {
        const response = await chai
          .request(app)
          .post(resellerBaseRoute)
          .set('Authorization', bearerToken)
          .send(resellerParams);
        expect(response.statusCode).to.equal(200);
        const { body } = response;
        // shouldBehaveLikeReseller(body);
      });
    });
  });
});
