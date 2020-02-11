const { User } = require('../../app/models');
const { encrypt } = require('../../app/helpers/encodeData');

describe('users', () => {
  it('should create a new user', async (done) => {
    const hashedPassword = await encrypt('12345678');
    const randomString = Math.random().toString(36).substr(2, 9);
    const createTest = await User.create({
      name: 'Teste',
      email: `${randomString}@gmail.com`,
      password: hashedPassword
    });
    expect(createTest).toBeTruthy();
    done();
  });
});