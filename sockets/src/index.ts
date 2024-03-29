import { MessageCreatedConsumer } from './events/consumers/message-created-consumer';
import io from './app';
import { kafkaWrapper } from './kafka-wrapper';
const port = 3000;

(async () => {
  if (!process.env.JWT_KEY) throw new Error('Must provide jwt key in env vars');
  if (!process.env.KAFKA_HOST)
    throw new Error('kafka host not initialized in env vars');

  // TODO: Create Redis caching service.

  await new MessageCreatedConsumer(kafkaWrapper.client).listen();

  io.listen(port, () => {
    console.log('listening on port', port);
  });
})();
