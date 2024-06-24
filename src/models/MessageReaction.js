import mongoose from 'mongoose';
import { MESSAGE_REACTIONS } from '../utils/constants';
const Schema = mongoose.Schema;

const MessageReactionSchema = new Schema({
  messageId: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reaction: { type: String, enum: MESSAGE_REACTIONS, required: true },
});

export default mongoose.model('MessageReaction', MessageReactionSchema);
