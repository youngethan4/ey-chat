import { BadRequestError } from "@ey-chat/common";
import { Request, Response } from "express";
import Group from "../models/group";
import Participant from "../models/participant";

export const indexGroupController = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId).populate("participants");
  if (!group) throw new BadRequestError("Invalid group id");
  const participants = await Participant.find({ group });

  res.send(participants.map((p) => p.username));
};
