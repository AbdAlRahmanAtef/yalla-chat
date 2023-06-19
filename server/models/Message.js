import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    socketId: String,
    content: String,
    sender: String,
    author: Object,
    time: String,
    to: String,
  },
  { timestamps: true },
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
