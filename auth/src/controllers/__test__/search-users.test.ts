import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user';

const createUser = async (username: string) => {
  const user = User.build({ password: 'fdsafdsa', username });
  await user.save();
  return user;
};

it('gets a list of qualifying users', async () => {
  await createUser('eric');
  await createUser('erica');
  await createUser('erik');
  await createUser('someoneri');
  const cookie = await global.signup();

  const { body: users } = await request(app)
    .get('/api/users?user=eri')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  console.log(users);
  expect(users).toHaveLength(3);
});

it('Currentuser is not in list', async () => {
  await createUser('tester');
  await createUser('testing');
  await createUser('tes');
  const cookie = await global.signup();

  const { body: users } = await request(app)
    .get('/api/users?user=tes')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  console.log(users);
  expect(users).toHaveLength(3);
});
