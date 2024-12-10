import mongoose from "mongoose";
import { v4 } from "uuid";

const userSchema = new mongoose.Schema({

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;