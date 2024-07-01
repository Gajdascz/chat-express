import mongoose from 'mongoose';
import { USER_STATUSES } from '../utils/constants.js';
import bcrypt from 'bcrypt';
import { uploadAvatar } from '../config/core/cloudinary.js';
import { persistMethods } from '../utils/helpers.js';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minLength: 1, maxLength: 32, unique: true },
    firstName: { type: String, maxLength: 50 },
    lastName: { type: String, maxLength: 50 },
    email: { type: String },
    password: { type: String, required: true },
    status: { type: String, enum: USER_STATUSES, default: USER_STATUSES.BASIC },
    avatar: {
      thumb: { type: String, default: null },
      profile: { type: String, default: null },
      lastUpdated: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

UserSchema.virtual('fullName').get(function () {
  if (!this.firstName || !this.lastName) return '';
  return `${this.firstName} ${this.lastName}`;
});
UserSchema.virtual('url').get(function () {
  return `/user/${this.username}`;
});
UserSchema.virtual('timeUntilNextAvatarUpdate').get(function () {
  const timeElapsed = Date.now() - this.avatar.lastUpdated;
  const remainingTime = 4.32e7 - timeElapsed;
  return remainingTime > 0 ? remainingTime : 0;
});

UserSchema.methods.setAvatar = async function (upload = null, setLastUpdated = true) {
  if (this.avatar.lastUpdated === 0 || this.avatarUpdateTime >= 0) {
    const { thumb, profile } = await uploadAvatar(this.id, upload);
    this.avatar.thumb = thumb;
    this.avatar.profile = profile;
    if (setLastUpdated) this.avatar.lastUpdated = Date.now();
    return true;
  } else
    throw new Error(
      `You can only update your avatar once every 12 hours. Try again in: ${Math.round((this.timeUntilNextAvatarUpdate / 1000 / 60 / 60) * 100) / 100} hours`
    );
};
UserSchema.methods.setPassword = async function (password) {
  try {
    this.password = await bcrypt.hash(password, 10);
    return true;
  } catch (err) {
    throw new Error(`UserSchema setPassword: ${err}`);
  }
};
UserSchema.methods.validatePassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return !!match;
  } catch (err) {
    throw new Error(`Failed to process password validation: ${err}`);
  }
};

const transform = (document, returnObj) => {
  delete returnObj.password;
  return persistMethods(UserSchema, document, returnObj);
};
UserSchema.set('toObject', { virtuals: true, methods: true, transform });
UserSchema.set('toJSON', { virtuals: true, methods: true, transform });

export default mongoose.model('User', UserSchema);
