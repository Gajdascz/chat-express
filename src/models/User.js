import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 50, minLength: 2 },
  lastName: { type: String, required: true, maxLength: 50, minLength: 2 },
  userName: { type: String, required: true, maxLength: 32, minLength: 1 },
  password: { type: String, required: true, minLength: 8, maxLength: 50 },
  status: { type: Number, default: 1 },
  avatar: {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
  },
});

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('url').get(function () {
  return `/user/${this.id}`;
});
