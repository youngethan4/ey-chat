import { Request, Response } from "express";
import Participant from "../models/participant";

export const indexParticipantController = async (
  req: Request,
  res: Response
) => {
  const participants = await Participant.find({
    username: req.currentUser!.username,
  }).populate("group");
  const groups = participants.map((p) => p.group);
  res.send(groups);
};
