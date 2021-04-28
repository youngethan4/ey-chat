import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import Group from '../../models/group';
import Participant from '../../models/participant';

it('Responds with a 400 error', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/groups/${id}`)
    .set('Cookie', global.signup())
    .send()
    .expect(400);
});

it('Deletes the group and all participants', async () => {
  const group = Group.build({ name: 'test' });
  await group.save();

  const participant = Participant.build({ group, username: 'test' });
  await participant.save();

  await request(app)
    .delete(`/api/groups/${group.id}`)
    .set('Cookie', global.signup())
    .send()
    .expect(204);

  const storedGroup = await Group.findById(group.id);
  expect(storedGroup).toBeNull();

  const storedParticipant = await Participant.findById(participant.id);
  expect(storedParticipant).toBeNull();
});
