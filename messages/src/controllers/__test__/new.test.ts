import { KafkaClient } from 'kafka-node';
import request from 'supertest';
import app from '../../app';
import Message from '../../models/message';

const MESSAGES_ENDPOINT = '/api/messages';

it('Reveives 400 on invalid groupId', async () => {
  await request(app)
    .post(MESSAGES_ENDPOINT)
    .set('Cookie', global.signup())
    .send({ sender: 'fdsafesaf', payload: 'fdsafea' })
    .expect(400);
});

it('Reveives 400 on invalid sender', async () => {
  await request(app)
    .post(MESSAGES_ENDPOINT)
    .set('Cookie', global.signup())
    .send({ groupId: 'fdae', payload: 'fdsafea' })
    .expect(400);
});

it('Reveives 400 on invalid payload', async () => {
  await request(app)
    .post(MESSAGES_ENDPOINT)
    .set('Cookie', global.signup())
    .send({ groupId: 'fdae', sender: 'fdsafesaf' })
    .expect(400);
});

it('Creates a new message', async () => {
  const groupId = 'fdafe';
  const { body: message } = await request(app)
    .post(MESSAGES_ENDPOINT)
    .set('Cookie', global.signup())
    .send({ groupId, sender: 'fdsafesaf', payload: 'fdsafe' })
    .expect(201);

  const storedMessage = await Message.findById(message.id);
  expect(storedMessage).not.toBeNull();
  expect(storedMessage!.groupId).toEqual(groupId);
});

it('Sends an event', async () => {
  await request(app)
    .post(MESSAGES_ENDPOINT)
    .set('Cookie', global.signup())
    .send({ groupId: 'fdafew', sender: 'fdsafesaf', payload: 'fdsafe' })
    .expect(201);

  expect(KafkaClient).toHaveBeenCalled();
});
