import { BadRequestError } from '@ey-chat/common';
import { Request, Response } from 'express';
import { MessageCreatedProducer } from '../events/producers/message-created-producer';
import { kafkaWrapper } from '../kafka-wrapper';
import Message from '../models/message';

const newController = async (req: Request, res: Response) => {
  const { groupId, sender, payload } = req.body;
  const message = Message.build({ groupId, sender, payload });
  await message.save();

  await new MessageCreatedProducer(kafkaWrapper.client).send(message);

  res.status(201).send(message);
};

export default newController;
