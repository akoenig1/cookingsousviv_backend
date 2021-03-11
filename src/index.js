import 'dotenv/config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import connectToDb from './utils/connectToDb';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import cron from 'node-cron';
import updateInstaPhotos from './middlewares/updateInstaPhotos';
import routes from './routes';
import { v4 as uuidv4 } from 'uuid'; //eslint-ignore-line no-unused-vars
import path from 'path'; //eslint-ignore-line no-unused-vars

const app = express();

connectToDb();

// Imported middleware //
// Express setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Authorization,content-type,application/json');
  next();
});
app.use(cors());

// Custom middleware //
// Check for new instagram photos every 15 minutes
app.use(function(req, res, next) {
  cron.schedule('*/15 * * * *', async (req, res, next) => {
    await updateInstaPhotos(req, res, next)
  })
  next();
});

// Router middleware //
app.use('/auth', routes.auth);
app.use('/instaPhotos', routes.instaPhotos);
app.use('/recipes', routes.recipes);

// Run server //
app.listen(process.env.PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});