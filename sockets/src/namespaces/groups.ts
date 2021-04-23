import { Namespace, Server } from 'socket.io';
import { BaseNsp } from './base';

class GroupNsp implements BaseNsp {
  private _nsp?: Namespace;
  private static groupNsp: GroupNsp;

  public static instance() {
    if (!this.groupNsp) this.groupNsp = new GroupNsp();
    return this.groupNsp;
  }

  private constructor() {}

  public get nsp() {
    if (!this._nsp)
      throw new Error('Must call start before retreiving namespace');
    return this._nsp;
  }

  public start(io: Server) {
    this._nsp = io.of('/groups').on('connection', (socket) => {
      console.log('connecting to nsp groups: ', socket.id);
      socket.on('join', (groupId: string) => {
        console.log('joining groups room: ', groupId);
        socket.join(groupId);
      });
    });
  }
}

export default GroupNsp;
