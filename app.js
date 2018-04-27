// Requirements;
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require ('./routes/index.js');

// REMINDER: In the near future, like after this commit, require models and sync to the database;

// Middleware;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// GET-PUT-POST-DELETE-CRUD;
app.use(router);

// Listener;
app.listen(3000, function() {
  console.log('Server is up and running!');
});
