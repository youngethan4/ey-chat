import client from 'socket.io-client';
import { Message } from '../redux/reducers/group-reducer';

class GroupSocketClient {
  private url = 'http://10.0.2.2/sockets/groups';
  clientSocket: SocketIOClient.Socket | null = null;

  connect = (token: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log('Connecting to client...');
      this.clientSocket = client.connect(this.url, {
        auth: { token },
        reconnection: true,
        transports: ['websocket'],
      });

      this.clientSocket.on('connect', () => {
        console.log('Connected');
        resolve();
      });
      this.clientSocket.on('connect_error', (err: any) => {
        console.error('Group socket connection error', err);
        reject(err);
      });
      this.clientSocket.on('error', (err: any) => {
        console.error('Group socket error', err);
      });
    });
  };

  joinRoom = (groupIds: string[]): Promise<void> => {
    console.log('joining rooms');
    return new Promise((resolve, reject) => {
      if (!this.clientSocket) {
        return reject('No socket connection.');
      }
      this.clientSocket.emit('join', groupIds, (res: any) => {
        if (res?.error) {
          console.error('Error joining group socket room', res.error);
          reject(res.error);
        } else {
          resolve();
        }
      });
    });
  };

  onMessage = (func: Function) => {
    if (!this.clientSocket) {
      throw new Error('No socket connection.');
    }
    console.log('in onMessage');
    this.clientSocket.on('message', (msg: string) => {
      func(JSON.parse(msg) as Message);
    });
  };

  disconnect = () => {
    this.clientSocket?.close();
  };
}

export const groupSocketClient = new GroupSocketClient();
