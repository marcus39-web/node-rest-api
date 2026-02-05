"use strict";

// import packeges
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/router.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// body-parser für die JSON-Daten
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router(app);

// start the server
const server = app.listen(port, (error) => {
  if(error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});