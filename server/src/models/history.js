import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  loginDate: {
    type: Date,
    required: true,
  },
  action: String,
  os: String,
  device: String,
  ip: String,
});

const History = mongoose.model('History', historySchema);

export default History;