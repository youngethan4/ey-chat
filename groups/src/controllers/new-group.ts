import { Request, Response } from 'express';
import { Kafka } from 'kafkajs';
import { ParticipantAddedProducer } from '../events/producers/participant-added-producer';
import Group from '../models/group';
import Participant from '../models/participant';

const client = new Kafka({ brokers: [process.env.KAFKA_HOST!] });

export const newGroupController = async (req: Request, res: Response) => {
  const { name, users } = req.body;

  const group = Group.build({ name });
  await group.save();

  if (users) {
    users.map(async (username: string) => {
      const participant = Participant.build({ group, username });
      await participant.save();

      await new ParticipantAddedProducer(client).send({
        //change to group{id,name}
        username: participant.username,
        groupId: participant.group.id,
        groupName: participant.group.name,
      });
    });
  }

  res.status(201).send(group);
};
