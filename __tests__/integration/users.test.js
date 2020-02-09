const { User } = require('../../app/models');
const { encrypt } = require('../../app/helpers/encodeData');

describe('users', () => {
  it('should create a new user', async () => {
    const hashedPassword = await encrypt('12345678');
    const createTest = await User.create({
      name: 'Teste',
      email: 'Teste27@teste.com',
      password: hashedPassword
    });
    expect(createTest).toBeTruthy();
  });
});