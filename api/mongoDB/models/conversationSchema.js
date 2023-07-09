import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    transporterId: {
      type: String,
      required: true,
    },
    manufactureId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Conversation', conversationSchema);
