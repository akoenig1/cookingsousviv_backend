import 'dotenv/config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import path from 'path'; //eslint-ignore-line no-unused-vars
import cookieParser from 'cookie-parser'
import keys from './config/keys'
import mongoose from 'mongoose';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid'; //eslint-ignore-line no-unused-vars
import routes from './routes';
import updateInstaPhotos from './helpers/updateInstaPhotos';
import cron from 'node-cron';

// Setup connection to MongoDB
const mongoDB = keys.MONGO_DB_URI
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error'));

// Setup CORS white list
var whitelist = ['http://www.cookingsousviv.com/', 'http://localhost:3000'];
var corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const app = express();


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
app.use(async function(req, res, next) {
    cron.schedule('*/15 * * * *', await updateInstaPhotos(req, res, next) )
    next();
});


// Router middleware //
app.use('/auth', routes.auth);
app.use('/instaPhotos', routes.instaPhotos);
app.use('/recipes', routes.recipes);


// Run server //
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});