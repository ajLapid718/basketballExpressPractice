// Requirements;
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require ('./routes/index.js');
const models = require('./models/index.js');
const seeds = require('./seed.js');

// Middleware;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Consider using something to render (like Nunjucks) as well as serving up static folder information;

// GET-PUT-POST-DELETE-CRUD;
app.use(router);

// Database Synchronization and Listener;
models.db.sync({force: true}).then(function () {
  console.log('All tables created!');
  seeds.populateDatabase();
  console.log('Populated the database!');
  app.listen(3000, function() {
    console.log('Server is up and running!');
  });
}).catch(console.error.bind(console));
