import { Schema, model } from "mongoose";

interface INote {
  note: String;
}

const noteSchema = new Schema<INote>({
  note: {
    type: String,
    required: true,
  },
});

export const Note = model<INote>("Note", noteSchema);
