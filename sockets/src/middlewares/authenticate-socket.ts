import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';
import { ExtendedSocket, UserPayload } from '../extended-socket';

export const authenticateSocket = (
  socket: ExtendedSocket,
  next: (err?: ExtendedError | undefined) => any
) => {
  const { token } = socket.handshake.auth;
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    socket.data.currentUser = payload;
  } catch (err) {
    next(new Error('unauthorized'));
  }
  next();
};
