import { Namespace, Server, Socket } from 'socket.io';
import { authenticateSocket } from '../middlewares/authenticate-socket';
import { BaseNsp } from './base';

class GroupNsp implements BaseNsp {
  private _nsp?: Namespace;

  public get nsp() {
    if (!this._nsp)
      throw new Error('Must call start before retreiving namespace');
    return this._nsp;
  }

  public start(io: Server) {
    this._nsp = io.of('/sockets/groups');
    this._nsp.use(authenticateSocket);
    this.nsp.on('connection', (socket: Socket) => {
      console.log('connecting to nsp groups: ', socket.id);
      socket.on('join', (groups: string, cb) => {
        console.log('joining groups rooms');
        JSON.parse(groups).forEach((g: { id: string }) => socket.join(g.id));
        cb();
      });
    });
  }
}

export const groupNsp = new GroupNsp();
