import { Request, Response } from "express";
import Group from "../models/group";
import Participant from "../models/participant";

export const newGroupController = async (req: Request, res: Response) => {
  const { name, users } = req.body;

  const group = Group.build({ name });
  await group.save();

  if (users) {
    users.map(async (username: string) => {
      const participant = Participant.build({ group: group, username });
      await participant.save();
    });
  }

  res.status(201).send(group);
};
