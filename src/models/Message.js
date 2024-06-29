import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: { type: String, required: false, maxLength: 50 },
    body: { type: String, required: true, maxLength: 500 },
    type: { type: String, required: true, enum: ['global', 'direct', 'group'] },
    sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    recipient: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
