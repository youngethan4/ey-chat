let clientSocket: SocketIOClient.Socket;

it('authenticates client', (done) => {
  clientSocket = global.setupClient({});
  clientSocket.on('connect', done);
  clientSocket.on('connect_error', (err: any) => {
    throw new Error(err);
  });
});

it('fails to authenicate client', (done) => {
  clientSocket = global.setupClient({ jwtKey: 'error' });
  clientSocket.on('connect_error', (err: Error) => {
    expect(err.message).toEqual('unauthorized');
    done();
  });
});

afterEach(() => {
  clientSocket.close();
});
