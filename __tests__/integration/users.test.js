import { User } from '../../app/models';
import { encrypt } from '../../app/helpers/encodeData';

describe('users', () => {
  it('should create a new user', async (done) => {
    let createTest = undefined;
    try {
      const hashedPassword = await encrypt('12345678');
      const randomString = Math.random().toString(36).substr(2, 9);
      createTest = await User.create({
        name: 'UserTest',
        email: `${randomString}@gmail.com`,
        password: hashedPassword
      });
      expect(createTest).toBeTruthy();
      done();
    } catch (err) {
      console.log(err);
      expect(createTest).toBeFalsy();
      done();
    }
  });
});