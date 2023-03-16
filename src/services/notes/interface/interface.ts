import {Types } from "mongoose";

export interface INote {
    _id: Types.ObjectId,
    note: String;
  }