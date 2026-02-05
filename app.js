"use strict";

// import packeges
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './routes/router.js';

dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

/* // central error logging for crashes
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
});
process.on('unhandledRejection', (reason, p) => {
  console.error('unhandledRejection', reason);
}); */

// Use Helmet and explicit Content Security Policy (allow images from localhost)
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "http://localhost:3000", "http://localhost:3002", "data:"]
  }
}));

// body-parser für die JSON-Daten
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router(app);

// start the server
const server = app.listen(port, (error) => {
  if(error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});