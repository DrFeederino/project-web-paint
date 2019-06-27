import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import routes from './routes/routes';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 9000;

// Application-Level Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Database connection
const uri = process.env.DATABASE_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established succesfully");
});

// Routes
app.use('/history', routes.history);
app.use('/users', routes.user);

// Start
app.listen(port, () =>
  console.log(`Server is running on port ${port}!`)
);