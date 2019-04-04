import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet'
import models, { connectDb } from './models';
import routes from './routes/routes';

const app = express();

// Application-Level Middleware

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

// Routes

app.use('/history', routes.history);
app.use('/users', routes.user);

// Start

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Server on port ${process.env.PORT}!`),
  );
});