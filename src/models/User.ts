import mongoose, { Schema } from "mongoose";

interface User {
  name: String;
  email: String;
  password: string;
}

const UserDataSchema: Schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

export default mongoose.model<User>("User", UserDataSchema);
