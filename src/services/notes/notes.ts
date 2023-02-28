import { Schema, model,Types } from "mongoose";

interface INote {
  _id: Types.ObjectId,
  note: String;
}

const noteSchema = new Schema<INote>({
  note: {
    type: String,
    required: true,
  },
});

export const Note = model<INote>("Note", noteSchema);
