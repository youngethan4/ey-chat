import { app } from '../app';
import request from 'supertest';

it('Responds with not found error', async () => {
  await request(app).get('/notaroute/error').send().expect(404);
});
