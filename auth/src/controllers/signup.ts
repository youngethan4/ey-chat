import { Request, Response } from 'express';
import { BadRequestError } from '@ey-chat/common';
import { User } from '../models/user';
import { JWT } from '../services/jwt';

export const signupController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new BadRequestError('Username in use');

  const user = User.build({ username, password });
  await user.save();

  const userJwt = JWT.sign(user.id, user.username);

  res.status(201).send({ user: user, accessToken: userJwt });
};
