import { BadRequestError } from '@ey-chat/common';
import { Request, Response } from 'express';
import { GroupDeletedProducer } from '../events/producers/group-deleted-producer';
import { kafkaWrapper } from '../kafka-wrapper';
import Group from '../models/group';
import Participant from '../models/participant';

export const deleteGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId);
  if (!group) throw new BadRequestError('Group not found');

  await Group.findByIdAndDelete(groupId);
  await Participant.deleteMany({ group });

  await new GroupDeletedProducer(kafkaWrapper.client).send({ id: groupId });

  res.sendStatus(204);
};
