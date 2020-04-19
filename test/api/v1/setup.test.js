const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../../app');

chai.use(chaiHttp);

const { expect } = chai;


describe('Keep test', () => {
  it(`keep`, async () => {
    // const response = await chai
    //   .request(app)
    //   .get(`${REVERSE_WORDS_ROUTE}?word=${wordToBeReversed}`);
    // if (response.error) console.error(response.error);
    expect('test').to.be.eq('test');
  });
});