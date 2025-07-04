import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false, // لأن في رسائل ممكن تكون بدون صورة
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
