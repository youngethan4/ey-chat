import mongoose from "mongoose";

interface MessageAttrs {
  groupId: string;
  sender: string;
  payload: string;
}

interface MessageDoc extends mongoose.Document {
  groupId: string;
  sender: string;
  payload: string;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
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
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  "Message",
  messageSchema
);

export default Message;
