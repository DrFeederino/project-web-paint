import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  loginDate: {
    type: Date,
    required: true,
  },
  action: String,
  os: String,
  device: String,
  IP: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const History = mongoose.model('History', historySchema);

export default History;