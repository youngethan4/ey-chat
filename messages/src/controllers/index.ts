import { Response } from 'express';
import Message from '../models/message';

interface Request {
  query: { lastCreatedAt: string; limit: number };
  params: { groupId: string };
}

export const indexController = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { lastCreatedAt, limit } = req.query;

  const messages = await Message.findNextMessages(groupId, {
    lastCreatedAt: lastCreatedAt ? new Date(lastCreatedAt) : undefined,
    limit: Number(limit),
  });

  res.send(messages);
};
