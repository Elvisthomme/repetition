import { random, authentication } from '../../helpers/index';
import dotenv from 'dotenv';

describe('Generate hash for authentication', () => {
  it('should generate random string of 172 characters', () => {
    const salt = random();
    expect(salt).toEqual(expect.any(String));
    expect(salt.length).toBe(172);
  });

  it('should crypt the password with ths salt string', () => {
    //important because the authentication function use env variable
    dotenv.config();

    const salt = random();
    const password = 'password';
    const saltPassword = authentication(salt, password);

    expect(saltPassword).toEqual(expect.any(String));
    expect(saltPassword.length).toBe(64);
  });
});
