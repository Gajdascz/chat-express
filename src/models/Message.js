import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: { type: String, default: 'Too Cool For A Title', maxLength: 50 },
    body: { type: String, required: true, maxLength: 500 },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
