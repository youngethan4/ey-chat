import { BadRequestError } from '@ey-chat/common';
import { Request, Response } from 'express';
import { ParticipantAddedProducer } from '../events/producers/participant-added-producer';
import { kafkaWrapper } from '../kafka-wrapper';
import Group from '../models/group';
import Participant from '../models/participant';

export const newParticipantController = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { username } = req.body;

  const group = await Group.findById(groupId);
  if (!group) throw new BadRequestError('Group not found.');

  const participant = Participant.build({ group, username });
  await participant.save();

  await new ParticipantAddedProducer(kafkaWrapper.client).send({
    username: participant.username,
    group: { id: participant.group.id, name: participant.group.name },
  });

  res.status(201).send(participant);
};
