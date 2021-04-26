import { Kafka } from 'kafkajs';
import { MessageCreatedConsumer } from './events/consumers/message-created-consumer';
import io from './app';

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('Must provide jwt key in env vars');

  // TODO: Create Redis caching service.

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
