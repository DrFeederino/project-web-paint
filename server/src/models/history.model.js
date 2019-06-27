import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  action: {
    type: String,
    required: true
  },
  useragent: {
    type: String,
    required: true,
  }
});

const History = mongoose.model('History', historySchema);

export default History;