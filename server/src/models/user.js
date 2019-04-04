import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  createdAt: Date,
});

userSchema.pre('remove', function(next) {
  this.model('History').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;