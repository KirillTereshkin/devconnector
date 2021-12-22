import { model, Schema } from "mongoose";
import ModelNames from "../types/Model";
import User from "../types/Model/Users";

const UsersSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = model<User>(ModelNames.users, UsersSchema);

export default UserModel;
