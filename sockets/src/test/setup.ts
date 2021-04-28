import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import app from '../app';
import client from 'socket.io-client';

interface AddressInfo {
  port: number;
}

jest.mock('../kafka-wrapper');
let port: number;

declare global {
  namespace NodeJS {
    interface Global {
      setupClient(opts: {
        nsp?: string;
        username?: string;
        jwtKey?: string;
      }): SocketIOClient.Socket;
    }
  }
}

beforeAll(() => {
  process.env.JWT_KEY = 'ahhh';
  app.listen();
  port = (app.address() as AddressInfo).port;
});
afterAll(() => {
  app.close();
});

global.setupClient = ({ nsp, username, jwtKey }) => {
  //Build jwt payload {id, email}
  const payload = {
    id: randomBytes(4).toString('hex'),
    username: username || 'test',
  };
  //create the jwt
  const token = jwt.sign(payload, jwtKey || process.env.JWT_KEY!);
  return client.connect(`http://localhost:${port}${nsp || '/'}`, {
    auth: { token },
  });
};
