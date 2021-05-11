import { Request, Response } from 'express';
import { BadRequestError } from '@ey-chat/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import { JWT } from '../services/jwt';

export const signinController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (!existingUser) throw new BadRequestError('Invalid credentials');

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

  const userJwt = JWT.sign(existingUser.id, existingUser.username);

  res.status(200).send({ user: existingUser, accessToken: userJwt });
};
