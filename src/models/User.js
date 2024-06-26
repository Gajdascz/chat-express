import mongoose from 'mongoose';
import { userModelSchemaTypes } from '../config/middleware/libs/validation/definitions/user.js';
import { USER_STATUSES } from '../utils/constants.js';
import { getDefaultAvatar } from '../config/core/cloudinary.js';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    ...userModelSchemaTypes,
    password: { type: String, required: true },
    recoveryQuestionAnswer: { type: String, required: true },
    status: { type: String, enum: USER_STATUSES, default: USER_STATUSES.BASIC },
    avatar: { thumb: { type: String, default: null }, profile: { type: String, default: null } },
  },
  { timestamps: true }
);

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('url').get(function () {
  return `/user/${this.id}`;
});

UserSchema.pre('save', function (next) {
  if (this.avatar.thumb && this.avatar.profile) return next();
  const { thumb, profile } = getDefaultAvatar();
  if (!this.avatar.thumb) this.avatar.thumb = thumb;
  if (!this.avatar.profile) this.avatar.profile = profile;
  next();
});

export default mongoose.model('User', UserSchema);
