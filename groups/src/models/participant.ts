import mongoose from "mongoose";
import { GroupDoc } from "./group";

interface ParticipantAttrs {
  username: string;
  group: GroupDoc;
}

export interface ParticipantDoc extends mongoose.Document {
  username: string;
  group: GroupDoc;
}

interface ParticipantModel extends mongoose.Model<ParticipantDoc> {
  build(attrs: ParticipantAttrs): ParticipantDoc;
}

const participantSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
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

participantSchema.statics.build = (attrs: ParticipantAttrs) => {
  return new Participant(attrs);
};

const Participant = mongoose.model<ParticipantDoc, ParticipantModel>(
  "Participant",
  participantSchema
);

export default Participant;
