import { Express } from 'express';
import supertest from 'supertest';
import createServer from '../../server';
import { register } from '../../controllers/auth.controller';

let app = createServer();
let userData = {
  name: 'Test Name',
  surname: 'Test Surname',
  password: 'Test Password',
  device: {
    name: 'VsCode Test',
    deviceId: 'ezarzatrezte'
  },
  email: 'test-email@test.test'
};
describe('Auth route', () => {
  describe('auth register /auth/register', () => {
    it('should call register and logging when registering', () => {
      supertest(app)
        .post('/auth/register')
        .send({ ...userData })
        .expect(register);
    });
  });
});
