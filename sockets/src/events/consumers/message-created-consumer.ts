import { BaseConsumer, MessageCreatedEvent, Topics } from '@ey-chat/common';
import GroupNsp from '../../namespaces/groups';

export class MessageCreatedConsumer extends BaseConsumer<MessageCreatedEvent> {
  topic: MessageCreatedEvent['topic'] = Topics.msgCreated;
  onMessage(data: MessageCreatedEvent['data']): void {
    const { groupId } = data;
    GroupNsp.instance().nsp.to(groupId).emit(JSON.stringify(data));
  }
}
