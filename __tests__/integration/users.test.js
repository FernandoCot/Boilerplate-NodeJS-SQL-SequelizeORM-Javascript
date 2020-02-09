import { User } from '../../app/models/user';
import { encrypt } from '../../app/helpers/encodeData';

describe('users', () => {
  it('should create a new user', async () => {
    const hashedPassword = await encrypt('12345678');
    const createTest = await User.create({
      name: 'Teste',
      email: 'Teste@teste.com',
      password: hashedPassword
    })

    console.log(createTest)
    expect(createTest.name).toBe('Teste');
  });
});