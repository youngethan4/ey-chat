import mongoose from 'mongoose';

interface MessageAttrs {
  groupId: string;
  sender: string;
  payload: string;
}

export interface MessageDoc extends mongoose.Document {
  groupId: string;
  sender: string;
  payload: string;
  createdAt: Date;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
  findNextMessages(
    groupId: string,
    query: {
      limit?: number;
      lastCreatedAt?: Date;
    }
  ): MessageDoc[];
}

const messageSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      require: true,
    },
    sender: {
      type: String,
      require: true,
    },
    payload: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.updatedAt;
      },
    },
  }
);

messageSchema.statics.findNextMessages = async function (
  groupId: string,
  query: {
    limit?: number;
    lastCreatedAt?: Date;
  }
) {
  const { limit, lastCreatedAt } = query;
  const messages = await this.aggregate()
    .match({ groupId })
    .match({ createdAt: { $lt: lastCreatedAt || new Date() } })
    .sort({ createdAt: -1 })
    .limit(limit || 50)
    .sort({ createdAt: 1 })
    .project({
      id: '$_id',
      _id: 0,
      groupId: 1,
      sender: 1,
      createdAt: 1,
      payload: 1,
    });
  return messages;
};

messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  'Message',
  messageSchema
);

export default Message;
