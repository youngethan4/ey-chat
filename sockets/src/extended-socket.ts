import { Socket } from 'socket.io';

export interface UserPayload {
  id: string;
  username: string;
}

export interface ExtendedSocket extends Socket {
  data: {
    currentUser?: UserPayload;
  };
}
