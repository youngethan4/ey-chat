import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';
import { MessageDoc } from '../models/message';

class BaseProducer {
  private producer: Producer;
  private topic: string = 'msg_created';

  constructor() {
    const client = new KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
    this.producer = new Producer(client, {
      requireAcks: 1,
      ackTimeoutMs: 1,
    });
  }

  send(message: MessageDoc): Promise<void> {
    const payloads: ProduceRequest[] = [
      { topic: this.topic, messages: message.toJSON() },
    ];
    return new Promise((resolve, reject) => {
      this.producer.on('ready', () => {
        console.log('Ready?');
        this.producer.send(payloads, (err, data) => {
          if (err) {
            console.log(err);
            reject();
          }
          console.log(err, data);
          console.log(`${this.topic} sent a new message.`);
          resolve();
        });
        this.producer.on('error', () => {
          reject();
        });
      });
    });
  }
}

export default BaseProducer;
