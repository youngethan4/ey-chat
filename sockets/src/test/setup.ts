import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

declare global {
  namespace NodeJS {
    interface Global {
      signup(setup?: { userId?: string; username?: string }): string;
    }
  }
}

beforeAll(async () => {
  process.env.JWT_KEY = 'ahhh';
});

beforeEach(async () => {});

afterAll(async () => {});

global.signup = (setup) => {
  //Build jwt payload {id, email}
  const payload = {
    id: setup?.userId || randomBytes(4).toString('hex'),
    username: setup?.username || 'test',
  };
  //create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //return the string
  return token;
};
