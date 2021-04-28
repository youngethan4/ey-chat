import { Namespace, Server } from 'socket.io';
import { ExtendedSocket } from '../extended-socket';
import { authenticateSocket } from '../middlewares/authenticate-socket';
import { BaseNsp } from './base';

class UserNsp implements BaseNsp {
  private _nsp?: Namespace;

  public get nsp() {
    if (!this._nsp)
      throw new Error('Must call start before retreiving namespace');
    return this._nsp;
  }

  public start(io: Server) {
    this._nsp = io.of('/sockets/users');
    this._nsp.use(authenticateSocket);
    this._nsp.on('connection', (socket: ExtendedSocket) => {
      console.log('User connected: ', socket.data.currentUser);
      socket.join(socket.data.currentUser!.username);
    });
  }
}

export const userNsp = new UserNsp();
