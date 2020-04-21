const baseApiRoute = '/api/v1/';

const authenticateUser = async ({ email, app, chai }) => {
  const { body } = await chai.request(app).post(`${baseApiRoute}auth`).send({ email, password: '123456789' });
  return `Bearer ${body.jwt}`;
};

module.exports = {
  baseApiRoute,
  authenticateUser,
}