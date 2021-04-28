import { BaseProducer, GroupDeletedEvent, Topics } from '@ey-chat/common';

export class GroupDeletedProducer extends BaseProducer<GroupDeletedEvent> {
  topic: GroupDeletedEvent['topic'] = Topics.groupDeleted;
}
