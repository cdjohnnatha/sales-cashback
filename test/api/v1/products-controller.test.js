const chai = require('chai');
const chaiHttp = require('chai-http');
const { houstonClientErrors } = require('houston-errors');

const app = require('../../../app');
const { baseApiRoute } = require('../../support/helpers/request-helpers');
const Factory = require('../../factory');
const {
  shouldBehaveLikeProductsList,
} = require('../../support/shared-examples/products-shared-examples');
const { authenticateUser } = require('../../support/helpers/request-helpers');

chai.use(chaiHttp);
const { expect } = chai;
const { BAD_REQUEST } = houstonClientErrors;

const productsBaseRoute = `${baseApiRoute}products/
`;

let reseller = null;
let bearerToken = null;

describe('Products-controller', () => {
    beforeEach(async () => {
      ({ dataValues: reseller } = await Factory.create('Resellers'));
      bearerToken = await authenticateUser({ app, chai, email: reseller.email });
    });

    describe('authenticated User', () => {
      it(`Get a list of products from store.`, async () => {
        const response = await chai.request(app).get(productsBaseRoute).set('Authorization', bearerToken);
        expect(response.statusCode).to.equal(200);
        const { body } = response;
        shouldBehaveLikeProductsList(body);
    });
    describe('Unauthorized reseller', () => {
      it('get profile without token should return 401', async () => {
        const response = await chai.request(app).get(productsBaseRoute);
        expect(response.statusCode).to.eq(401);
      });
    });
  });
});
