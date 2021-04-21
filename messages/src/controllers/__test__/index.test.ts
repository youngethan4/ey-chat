import request from 'supertest';
import app from '../../app';
import Message from '../../models/message';

const buildMessage = async (groupId: string, payload?: string) => {
  const message = Message.build({
    groupId,
    sender: 'Sender',
    payload: payload || 'Test Message',
  });
  await message.save();
  return message;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

it("Responds with a group's list of messages", async () => {
  const groupId = 'fdagafdadg';
  await buildMessage(groupId);
  await buildMessage(groupId);
  await buildMessage(groupId);

  const { body: messages } = await request(app)
    .get(`/api/messages/${groupId}`)
    .set('Cookie', global.signup())
    .send()
    .expect(200);

  expect(messages).toHaveLength(3);
});

it('Responds with correct messages', async () => {
  const groupId = 'fdagafdadg';
  await buildMessage(groupId, '1');
  await sleep(500);
  await buildMessage(groupId, '2');
  await sleep(500);
  await buildMessage(groupId, '3');
  await sleep(500);
  await buildMessage(groupId, '4');
  await sleep(500);
  await buildMessage(groupId, '5');
  await sleep(500);
  await buildMessage(groupId, '6');

  const { body: messages1 } = await request(app)
    .get(`/api/messages/${groupId}?limit=${3}`)
    .set('Cookie', global.signup())
    .send()
    .expect(200);

  expect(messages1).toHaveLength(3);

  const { body: messages2 } = await request(app)
    .get(
      `/api/messages/${groupId}?limit=${3}&lastCreatedAt=${
        messages1[0].createdAt
      }`
    )
    .set('Cookie', global.signup())
    .send()
    .expect(200);

  expect(messages2).toHaveLength(3);
  expect(messages2[0].payload).toEqual('1');
});
