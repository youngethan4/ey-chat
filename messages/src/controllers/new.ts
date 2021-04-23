import { BadRequestError } from '@ey-chat/common/build';
import { Request, Response } from 'express';
import { Kafka } from 'kafkajs';
import { MessageCreatedProducer } from '../events/producers/message-created-producer';
import Message from '../models/message';

const kafka = new Kafka({ brokers: [process.env.KAFKA_HOST!] });

const newController = async (req: Request, res: Response) => {
  const { groupId, sender, payload } = req.body;
  const message = Message.build({ groupId, sender, payload });
  await message.save();

  try {
    await new MessageCreatedProducer(kafka).send(message);
  } catch (err) {
    throw new BadRequestError('Server Error');
  }

  res.status(201).send(message);
};

export default newController;
