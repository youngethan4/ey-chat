import request from 'supertest';
import { app } from '../../app';

const currentuser = '/api/users/currentuser';

it('responds with details on current user', async () => {
  const token = await global.signup();

  const res = await request(app)
    .get(currentuser)
    .set('Authorization', token)
    .send()
    .expect(200);

  expect(res.body.user.username).toEqual('test');
});

it('responds with null if non auth', async () => {
  const res = await request(app).get(currentuser).send().expect(200);
  expect(res.body.user).toBeNull();
});
