import { Types } from "mongoose";

export interface Post {
  _id: Types.ObjectId;
  title: string;
  content: string;
  comments: Types.ObjectId[];
}