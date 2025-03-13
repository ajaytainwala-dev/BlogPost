import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  about: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
