import { Request, Response } from 'express';

export const currentUserController = (req: Request, res: Response) => {
  res.send({ user: req.currentUser || null });
};
