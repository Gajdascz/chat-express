import mongoose from 'mongoose';
import { USER_STATUSES } from '../utils/constants';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: false, maxLength: 50, minLength: 2 },
    lastName: { type: String, required: false, maxLength: 50, minLength: 2 },
    userName: { type: String, unique: true, required: true, maxLength: 32, minLength: 1 },
    password: { type: String, required: true, minLength: 8, maxLength: 50 },
    status: { type: String, enum: Object.values(USER_STATUSES), default: USER_STATUSES.BASIC },
    avatar: { publicId: { type: String, required: true }, url: { type: String, required: true } },
  },
  { timestamps: true }
);

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('url').get(function () {
  return `/user/${this.id}`;
});

export default mongoose.model('User', UserSchema);
