import { socketMessage } from '../redux/actions/message-actions';
import { Message } from '../redux/reducers/group-reducer';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { groupSocketClient } from '../socket-io/group-socket-client';

export const useGroupSocket = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.accessToken!);
  groupSocketClient
    .connect(token)
    .catch(error => console.error('Error connecting to group socket', error));

  groupSocketClient.onMessage((msg: string) => {
    console.log('Message revieved');
    dispatch(socketMessage(JSON.parse(msg) as Message));
  });

  const joinRooms = (groupIds: string[]) => {
    groupIds.forEach(g => groupSocketClient.joinRoom(g));
  };

  const disconnect = () => {
    groupSocketClient.disconnect();
  };

  return { joinRooms, disconnect };
};
