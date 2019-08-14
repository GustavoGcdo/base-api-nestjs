import * as mongoose from 'mongoose';

export const schema = new mongoose.Schema({
  name: { type: String },
  login: { type: String },
  email: { type: String },
  password: { type: String },
  dataNascimento: { type: Date },
  preference: {
    language: { type: String },
    theme: { type: String },
  },
  isAdmin: { type: Boolean },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
});

export const UserSchema = { name: 'User', schema };
