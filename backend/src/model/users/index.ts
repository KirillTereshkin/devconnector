import { model, Schema } from "mongoose";
import ModelNames from "../services/types";
import User from "./services/types";

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
