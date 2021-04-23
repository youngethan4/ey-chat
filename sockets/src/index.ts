import { Kafka } from 'kafkajs';
import { Server } from 'socket.io';
import { MessageCreatedConsumer } from './events/consumers/message-created-consumer';
import GroupNsp from './namespaces/groups';
import UserNsp from './namespaces/users';
const io = new Server();

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('Must provide jwt key in env vars');

  GroupNsp.instance().start(io);
  UserNsp.instance().start(io);

  const kafka = new Kafka({ brokers: [process.env.KAFKA_HOST!] });
  await new MessageCreatedConsumer(kafka).listen();

  io.listen(3000, {
    path: '/sockets',
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: true,
  });
};

start();
