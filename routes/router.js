"use strict";

import express from 'express';

const router = (app) => {
  const options = {
    root: 'public',
  }

  app.use(express.static('public'));

  /* app.get('/', (req, res) => {
    res.send('Trallalla');
  }); */
}

export default router;