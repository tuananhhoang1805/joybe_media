import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
    },
    gender: {
      type: String,
    },
    mobile: {
      type: Number,
      maxlength: 20,
    },
    address: {
      type: String,
      maxlength: 100,
    },
    favorate: {
      type: String,
      maxlength: 200,
    },
    links: [String],
    birthdate: {
      type: Date, 
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
