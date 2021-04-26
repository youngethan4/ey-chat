import { BaseProducer, ParticipantAddedEvent, Topics } from '@ey-chat/common';

export class ParticipantAddedProducer extends BaseProducer<ParticipantAddedEvent> {
  topic: ParticipantAddedEvent['topic'] = Topics.groupCreated;
}
