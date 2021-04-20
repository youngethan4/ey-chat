import { BadRequestError } from '@ey-chat/common';
import { Request, Response } from 'express';
import Group from '../models/group';

export const indexGroupController = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId).populate('participants');
  if (!group) throw new BadRequestError('Invalid group id');

  res.send(group.participants);
};
