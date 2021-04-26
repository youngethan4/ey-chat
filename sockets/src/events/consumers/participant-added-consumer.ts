import {
  BaseConsumer,
  ParticipantAddedEvent,
  Topics,
} from '@ey-chat/common/build';
import UserNsp from '../../namespaces/users';

export class ParticipantAddedConsumer extends BaseConsumer<ParticipantAddedEvent> {
  topic: ParticipantAddedEvent['topic'] = Topics.groupCreated; //Change to participantAdded
  onMessage(data: ParticipantAddedEvent['data']): void {
    const { username } = data;
    UserNsp.instance().nsp.to(username).emit(JSON.stringify(username));
  }
}
