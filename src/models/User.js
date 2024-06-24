import mongoose from 'mongoose';
import { userSchemaTypes } from '../config/validation/index.js';

const Schema = mongoose.Schema;

const UserSchema = new Schema(userSchemaTypes, { timestamps: true });

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('url').get(function () {
  return `/user/${this.id}`;
});

export default mongoose.model('User', UserSchema);
