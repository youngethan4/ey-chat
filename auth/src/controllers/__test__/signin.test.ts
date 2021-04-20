import request from 'supertest';
import { app } from '../../app';

const signin = '/api/users/signin';
const signup = '/api/users/signup';

it('fails when a username does not exsist', async () => {
  await request(app)
    .post(signin)
    .send({ username: 'test', password: 'pass' })
    .expect(400);
});

it('fails with an incorrect password', async () => {
  await request(app)
    .post(signup)
    .send({ username: 'test', password: 'pass' })
    .expect(201);

  await request(app)
    .post(signin)
    .send({ username: 'test', password: 'error' })
    .expect(400);
});

it('responds with cookie', async () => {
  await request(app)
    .post(signup)
    .send({ username: 'test', password: 'pass' })
    .expect(201);

  const res = await request(app)
    .post(signin)
    .send({ username: 'test', password: 'pass' })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
