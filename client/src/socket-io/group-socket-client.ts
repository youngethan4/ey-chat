import client from 'socket.io-client';

class GroupSocketClient {
  private url = 'http://localhost/sockets/groups';
  private clientSocket: SocketIOClient.Socket | null = null;

  connect = async (token: string): Promise<void> => {
    console.log('Connecting to client...');
    this.clientSocket = client.connect(this.url, {
      auth: { token },
    });

    return new Promise((resolve, reject) => {
      this.clientSocket!.on('connect', () => resolve());
      this.clientSocket!.on('connect_error', (err: any) => {
        console.error(err);
        reject(err);
      });
    });
  };

  joinRoom = (groupId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.clientSocket) {
        return reject('No socket connection.');
      }
      this.clientSocket.emit('join', groupId, (res: any) => {
        if (res.error) {
          console.error(res.error);
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
    this.clientSocket.on('message', func);
  };
}

export const groupSocketClient = new GroupSocketClient();
