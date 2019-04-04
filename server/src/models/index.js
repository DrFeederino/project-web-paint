import mongoose from 'mongoose';

import User from './user';
import History from './history';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { User, History };

export { connectDb };

export default models;