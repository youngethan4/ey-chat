import { Namespace, Server } from 'socket.io';

export interface BaseNsp {
  nsp: Namespace;
  start(io: Server): void;
}
