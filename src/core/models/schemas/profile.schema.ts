import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String },
  login: { type: String },
  email: { type: String },
  password: { type: String },
});

export const ProfileSchema = { name: 'Profile', schema };
