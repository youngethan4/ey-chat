import mongoose from 'mongoose';

interface GroupAttrs {
  name: string;
  participants: string[];
}

export interface GroupDoc extends mongoose.Document {
  name: string;
  participants: string[];
}

interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attrs: GroupAttrs): GroupDoc;
}

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: false,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
      },
    ],
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

groupSchema.statics.build = (attrs: GroupAttrs) => {
  return new Group(attrs);
};

const Group = mongoose.model<GroupDoc, GroupModel>('Group', groupSchema);

export default Group;
