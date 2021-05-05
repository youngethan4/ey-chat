import { Request, Response } from 'express';
import { User } from '../models/user';

interface RequestQuery extends Request {
  query: { user: string };
}

export const searchUsersController = async (
  req: RequestQuery,
  res: Response
) => {
  const { user } = req.query;
  const users = await User.find(
    { username: { $regex: user, $options: 'i' } },
    'username'
  ).limit(20);

  res.send(users);
};
