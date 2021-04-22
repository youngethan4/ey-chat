import { BadRequestError } from '@ey-chat/common/build';
import { Request, Response } from 'express';
import BaseProducer from '../events/base-producer';
import Message from '../models/message';

const newController = async (req: Request, res: Response) => {
  const { groupId, sender, payload } = req.body;
  const message = Message.build({ groupId, sender, payload });
  await message.save();

  try {
    await new BaseProducer().send(message);
  } catch (err) {
    throw new BadRequestError('Server Error');
  }

  res.status(201).send(message);
};

export default newController;
