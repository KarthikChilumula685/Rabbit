import mongoose from "mongoose";

const { Schema, model } = mongoose;

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Subscriber", subscriberSchema);
