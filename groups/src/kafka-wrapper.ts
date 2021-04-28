import { Kafka } from 'kafkajs';

class KafkaWrapper {
  private _client?: Kafka;

  get client() {
    if (!this._client) throw new Error('Client not initialized.');
    return this._client;
  }

  constructor() {
    this._client = new Kafka({ brokers: [process.env.KAFKA_HOST!] });
  }
}

export const kafkaWrapper = new KafkaWrapper();
