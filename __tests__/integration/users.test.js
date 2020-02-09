const app = require('../../index');
const request = require('supertest');
const User = require('../../app/models/user');
const { encrypt } = require('../../app/helpers/encodeData');

describe('users', () => {
  it('should create a new user', async () => {
    const hashedPassword = await encrypt('12345678');
    const createTest = await User.create({
      name: 'Teste',
      email: 'Teste@teste.com',
      password: hashedPassword
    });

    const response = await request(app)
      .post("/sign_up")
      .send({
        name: createTest.name,
        email: createTest.email,
        password: createTest.password
      });

    expect(response.status).toBe(200);
  });
});