import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';
import { ExtendedSocket, UserPayload } from '../extended-socket';

export const authenticateSocket = (
  socket: ExtendedSocket,
  next: (err?: ExtendedError | undefined) => any
) => {
  console.log('in auth');
  const { token } = socket.handshake.auth;
  console.log(token);
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    console.log(payload);
    socket.data.currentUser = payload;
  } catch (err) {
    console.log(err);
    return next(new Error('unauthorized'));
  }
  next();
};
