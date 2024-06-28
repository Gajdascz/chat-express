import mongoose from 'mongoose';
import { RECOVERY_QUESTIONS, USER_STATUSES } from '../utils/constants.js';
import bcrypt from 'bcrypt';
import { uploadAvatar } from '../config/core/cloudinary.js';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minLength: 1, maxLength: 32, unique: true },
    firstName: { type: String, maxLength: 50 },
    lastName: { type: String, maxLength: 50 },
    email: { type: String },
    password: { type: String, required: true },
    recovery: {
      question: { type: String, enum: RECOVERY_QUESTIONS, required: true },
      hash: { type: String, required: true },
    },
    status: { type: String, enum: USER_STATUSES, default: USER_STATUSES.BASIC },
    avatar: { thumb: { type: String, default: null }, profile: { type: String, default: null } },
  },
  { timestamps: true }
);

// Virtuals
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});
UserSchema.virtual('url').get(function () {
  return `/user/${this.username}`;
});

// Methods
UserSchema.methods.setAvatar = async function (filePath = null) {
  try {
    const { thumb, profile } = await uploadAvatar(this.id, filePath);
    this.avatar.thumb = thumb;
    this.avatar.profile = profile;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
UserSchema.methods.setPassword = async function (password) {
  try {
    this.password = await bcrypt.hash(password, 10);
    return true;
  } catch (err) {
    console.error(`UserSchema setPassword: ${err}`);
    return false;
  }
};
UserSchema.methods.validatePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return !!match;
};
UserSchema.methods.setRecovery = async function (question, answer) {
  try {
    this.recovery.question = question;
    this.recovery.hash = await bcrypt.hash(answer, 10);
    return true;
  } catch (err) {
    console.error(`UserSchema setRecovery: ${err}`);
    return false;
  }
};
UserSchema.methods.validateRecovery = async function (answer) {
  const match = await bcrypt.compare(answer, this.recovery.hash);
  return !!match;
};

// Model Options
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

export default mongoose.model('User', UserSchema);
