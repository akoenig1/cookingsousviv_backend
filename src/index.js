import 'dotenv/config';
import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import local from 'passport-local';
import mongoose from 'mongoose';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
//import models from './models';
import routes from './routes';
import instaPhoto from './models/instaPhoto';
import User from './models/user';
import bcrypt from 'bcryptjs';

// Setup connection to MongoDB
const mongoDB = `mongodb+srv://akoenig1:${process.env.MONGO_DB_PW}@cluster0.hhgkn.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error'));

// Setup Local Strategy
const LocalStrategy = local.Strategy;
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne( {username: username }, (err, user) => {
            if(err) {
                return done(err);
            };
            if(!user) {
                return done(null, false, {msg: 'Username does not exist'});
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    // passwords match so log user in
                    return done(null, user);
                }
                else {
                    // passwords do not match
                    return done(null, false, { msg: 'Incorrect password' });
                }
            });
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Setup CORS white list
var whitelist = ['http://www.cookingsousviv.com/'];
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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// Custom middleware //
// Wait for response from Instagram API requested in instaPhotos model
app.use( async (req, res, next) => {
    req.context = {
        photos: await instaPhoto,
    };
    next();
});

// Access current user in all views/controllers
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

// Router middleware //
app.use('/instaPhotos', routes.instaPhotos);

// Run server //
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});