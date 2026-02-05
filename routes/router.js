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

  //Benutzer löschen
  app.post('/users/:id/delete', (req, res) => {
    const id = req.params.id;
    pool.query("DELETE FROM tbl_users WHERE users_id = ?", [id], (error, result) => {
      if(error) {
        console.error(error);
        return res.status(500).send('Fehler beim Löschen');
      }
      res.redirect('/users');
    });
  });

  // Formular zum Erstellen eines neuen Benutzers anzeigen
  app.get('/create-user', (req, res) => {
    pool.query("SELECT MAX(users_id) as maxId FROM tbl_users", (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Datenbankfehler');
      }
      const nextId = (result[0].maxId || 0) + 1;
      res.render('create-user', {
        title: 'Neuen Benutzer anlegen',
        heading: 'Neuen Benutzer anlegen',
        nextId: nextId
      });
    });
  });

  // Neuen Benutzer erstellen
  app.post('/users', (req, res) => {
    const { users_id, users_name, users_password } = req.body;
    pool.query("INSERT INTO tbl_users (users_id, users_name, users_password) VALUES (?, ?, ?)", 
      [users_id, users_name, users_password], 
      (error, result) => {
        if(error) {
          console.error(error);
          return res.status(500).send('Fehler beim Erstellen');
        }
        res.redirect('/users');
      }
    );
  });

  // Formular zum Ändern eines Benutzers anzeigen
  app.get('/edit-user', (req, res) => {
    pool.query("SELECT * FROM tbl_users", (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Datenbankfehler');
      }
      res.render('edit-user', {
        title: 'Benutzer ändern',
        heading: 'Benutzer ändern',
        users: result,
      });
    });
  });

  // Benutzer aktualisieren
  app.post('/users/update', (req, res) => {
    const { users_id, users_name, users_password } = req.body;
    pool.query("UPDATE tbl_users SET users_name = ?, users_password = ? WHERE users_id = ?", 
      [users_name, users_password, users_id], 
      (error, result) => {
        if(error) {
          console.error(error);
          return res.status(500).send('Fehler beim Aktualisieren');
        }
        res.redirect('/users');
      }
    );
  });
}

export default router;