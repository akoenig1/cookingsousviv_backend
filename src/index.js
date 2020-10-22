import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
//import models from './models';
import routes from './routes';
import instaPhotos from './models/instaPhotos';

const app = express();

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
app.use(express.urlencoded({ extended: true }));

// Custom middleware //
// Wait for response from Instagram API requested in instaPhotos model
app.use( async (req, res, next) => {
    req.context = {
        photos: await instaPhotos,
    };
    next();
});

// Router middleware //
app.use('/instaPhotos', routes.instaPhotos);

// Run server //
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});