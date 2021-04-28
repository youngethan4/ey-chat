import { ParticipantAddedEvent } from '@ey-chat/common';
import { kafkaWrapper } from '../../../kafka-wrapper';
import { ParticipantAddedConsumer } from '../participant-added-consumer';

describe('message created consumer tests', () => {
  let clientSocket: SocketIOClient.Socket;
  const username = 'test-user';

  beforeAll((done) => {
    clientSocket = global.setupClient({
      nsp: '/sockets/users',
      username: username,
    });
    clientSocket.on('connect', done);
    clientSocket.on('error', (err: any) => {
      throw new Error(err);
    });
    clientSocket.on('connect_error', (err: any) => {
      throw new Error(err);
    });
  });

  it('Emits a message event', (done) => {
    const message: ParticipantAddedEvent['data'] = {
      username,
      group: {
        id: 'test-id',
        name: 'test-name',
      },
    };

    const consumer = new ParticipantAddedConsumer(kafkaWrapper.client);

    clientSocket.on('new-group', (msg: string) => {
      console.log(msg);
      expect(msg).toBe(JSON.stringify(message));
      done();
    });

    consumer.onMessage(message);
  });

  afterAll(() => {
    clientSocket.close();
  });
});
