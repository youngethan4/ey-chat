import { BaseConsumer, ParticipantAddedEvent, Topics } from '@ey-chat/common';
import { userNsp } from '../../namespaces/users';

export class ParticipantAddedConsumer extends BaseConsumer<ParticipantAddedEvent> {
  topic: ParticipantAddedEvent['topic'] = Topics.participantAdded; //Change to participantAdded
  onMessage(data: ParticipantAddedEvent['data']): void {
    const { username } = data;
    userNsp.nsp.to(username).emit('new-group', JSON.stringify(data));
  }
}
