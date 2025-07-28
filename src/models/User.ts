import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  githubID: string;
  isCorrectPassword: (password: string) => boolean;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address']
  },
  password: {
    type: String,
    minlength: 5,
    required: function () {
      // either require a password or a GitHubID
      return !this.githubId;
    }
  },
  githubId: { type: String, unique: true }
});

// hash user password
userSchema.pre('save', async function (next) {
  if (this.password && (this.isNew || this.isModified('password'))) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
