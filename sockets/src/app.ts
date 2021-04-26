import { Server } from 'socket.io';
import { authenticateSocket } from './middlewares/authenticate-socket';
import GroupNsp from './namespaces/groups';
import UserNsp from './namespaces/users';

const io = new Server();

io.use(authenticateSocket);

GroupNsp.instance().start(io);
UserNsp.instance().start(io);

export default io;
