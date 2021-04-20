import { BadRequestError } from "@ey-chat/common";
import { Request, Response } from "express";
import Group from "../models/group";
import Participant from "../models/participant";

export const newParticipantController = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { username } = req.body;

  const group = await Group.findById(groupId);
  if (!group) throw new BadRequestError("Group not found.");

  const participant = Participant.build({ group, username });
  await participant.save();

  res.status(201).send(participant);
};
