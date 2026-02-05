"use strict";

import pool from '../data/config.js';
import express from 'express';
import path from 'path';

const router = (app) => {
  const options = {
    root: 'public',
  }

  app.use(express.static('public'));

  app.set('view engine', 'ejs');
  app.set('views', path.join('views'));

  // alle User ausgeben
  app.get('/users', (req, res) => {
    pool.query("SELECT * FROM tbl_users", (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Datenbankfehler');
      }

      console.log(result);

      res.render('all-users', {
        title: 'Benutzer-Dashboard',
        heading: 'Benutzer Dashboard',
        users: result,
      });
    });
  });

  // einzelnen User ausgeben
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query("SELECT * FROM tbl_users WHERE users_id = ?", [id], (error,result) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Datenbankfehler');
      }
      console.log(result);
      if (!result || result.length === 0) {
        return res.status(404).send('User nicht gefunden');
      }
      res.render('users-detail', {
        title: 'Benutzer-Details',
        heading: 'Benutzer-Details',
        user: result,
      });
    });
  });
}

export default router;