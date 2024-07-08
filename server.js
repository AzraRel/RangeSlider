'use strict';

// DB Verbindung (CouchDB)
import nano from "nano";
import credentials from "./credentials.js";
const db = nano(`http://${credentials.username}:${credentials.passphrase}@127.0.0.1:5984`).db;
const dbName = 'shop';

// Webserver
import express from 'express';
const server = express();

server.use(express.static('public', {
  extensions:['html']
}));

server.get('/load_articles', (request, response) => {
  const myDB = db.use(dbName);
  myDB.find({
    selector: {
      preis: {
        '$gte': Number(request.query.min),
        '$lte': Number(request.query.max)
      }
    }
  }).then(
    res => res.docs
  ).then(
    res => response.json(res)
  ).catch(
    err => console.log(`Error retrieving filtered articles:${err}`)
  )
})

const init = () => {
  server.listen(80, err => console.log(err || 'Server läuft'));
}

init();