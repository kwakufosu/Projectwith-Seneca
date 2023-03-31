import { Schema, model,Types } from "mongoose";
import {INote} from "../interface/interface"


const noteSchema = new Schema<INote>({
  note: {
    type: String,
    required: true,
  },
});

export const Note = model<INote>("Note", noteSchema);
