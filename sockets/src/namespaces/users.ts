import { Namespace, Server } from 'socket.io';
import { BaseNsp } from './base';

class UserNsp implements BaseNsp {
  private _nsp?: Namespace;
  private static userNsp: UserNsp;

  public static instance() {
    if (!this.userNsp) this.userNsp = new UserNsp();
    return this.userNsp;
  }

  private constructor() {}

  public get nsp() {
    if (!this._nsp)
      throw new Error('Must call start before retreiving namespace');
    return this._nsp;
  }

  public start(io: Server) {
    this._nsp = io.of('/users').on('connection', (socket) => {
      socket.on('join', (username: string) => {
        console.log('joining users room: ', username);
        socket.join(username);
      });
    });
  }
}

export default UserNsp;
