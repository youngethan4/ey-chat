import { Server } from 'socket.io';
import { createServer } from 'http';
import { authenticateSocket } from './middlewares/authenticate-socket';
import { groupNsp } from './namespaces/groups';
import { userNsp } from './namespaces/users';

const httpServer = createServer();
const io = new Server(httpServer);

io.use(authenticateSocket);

groupNsp.start(io);
userNsp.start(io);

export default httpServer;
