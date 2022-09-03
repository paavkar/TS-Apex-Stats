/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import { IUser } from "../types";

const userSchema: mongoose.Schema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true }
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

