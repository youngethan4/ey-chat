import { BaseProducer, MessageCreatedEvent, Topics } from '@ey-chat/common';

export class MessageCreatedProducer extends BaseProducer<MessageCreatedEvent> {
  topic: Topics.msgCreated = Topics.msgCreated;
}
