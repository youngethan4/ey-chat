import { Request, Response } from 'express';
import Participant from '../models/participant';

export const indexParticipantController = (req: Request, res: Response) => {
  const groups = Participant.find({ userId: req.currentUser!.id })
    .populate('group')
    .map((participant) => participant.group);
  res.send(groups);
};
