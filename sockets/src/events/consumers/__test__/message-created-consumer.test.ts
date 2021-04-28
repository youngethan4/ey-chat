import { MessageCreatedEvent } from '@ey-chat/common';
import { MessageCreatedConsumer } from '../message-created-consumer';
import { kafkaWrapper } from '../../../kafka-wrapper';

describe('message created consumer tests', () => {
  let clientSocket: SocketIOClient.Socket;
  const groupId = 'test-group-id';
  const groups = [{ id: groupId }];

  beforeAll((done) => {
    clientSocket = global.setupClient({ nsp: '/sockets/groups' });
    clientSocket.on('connect', () => {
      clientSocket.emit('join', JSON.stringify(groups), () => done());
    });
    clientSocket.on('error', (err: any) => {
      throw new Error(err);
    });
    clientSocket.on('connect_error', (err: any) => {
      throw new Error(err);
    });
  });

  it('Emits a message event', (done) => {
    const message: MessageCreatedEvent['data'] = {
      groupId,
      sender: 'test-sender',
      payload: 'hello',
      createdAt: new Date(),
    };

    const consumer = new MessageCreatedConsumer(kafkaWrapper.client);

    clientSocket.on('message', (msg: string) => {
      expect(msg).toBe(JSON.stringify(message));
      done();
    });

    consumer.onMessage(message);
  });

  afterAll(() => {
    clientSocket.close();
  });
});
