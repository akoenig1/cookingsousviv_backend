import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
//import models from './models';
import routes from './routes';
import instaPhotos from './models/instaPhotos';

const app = express();

// Imported middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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