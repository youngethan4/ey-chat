import { Request, Response } from 'express';
import { User } from '../models/user';

export const searchUsersController = async (req: Request, res: Response) => {
  const username = req.currentUser!.username;
  const { user } = req.query;

  const users = await User.find({
    username: {
      $regex: new RegExp('^' + user + '\\w*', 'i'),
      $not: new RegExp(`^${username}$`, 'i'),
    },
  }).limit(20);

  res.send(users.map((user) => user.username));
};
