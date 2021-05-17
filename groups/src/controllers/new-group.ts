import { Request, Response } from 'express';
import { ParticipantAddedProducer } from '../events/producers/participant-added-producer';
import { kafkaWrapper } from '../kafka-wrapper';
import Group from '../models/group';
import Participant from '../models/participant';

export const newGroupController = async (req: Request, res: Response) => {
  const { name, users } = req.body;
  const group = Group.build({ name });
  await group.save();

  if (users) {
    users.forEach(async (username: string) => {
      const participant = Participant.build({ group, username });
      await participant.save();

      await new ParticipantAddedProducer(kafkaWrapper.client).send({
        username: participant.username,
        group: { id: participant.group.id, name: participant.group.name },
      });
    });
  }

  res.status(201).send(group);
};
