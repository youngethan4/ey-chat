import { BaseConsumer, MessageCreatedEvent, Topics } from '@ey-chat/common';
import { groupNsp } from '../../namespaces/groups';

export class MessageCreatedConsumer extends BaseConsumer<MessageCreatedEvent> {
  topic: MessageCreatedEvent['topic'] = Topics.msgCreated;
  onMessage(data: MessageCreatedEvent['data']): void {
    const { groupId } = data;
    groupNsp.nsp.to(groupId).emit('message', JSON.stringify(data));
  }
}
