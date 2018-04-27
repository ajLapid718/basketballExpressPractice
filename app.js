// Requirements;
const express = require('express');
const app = express();

// GET-PUT-POST-DELETE-CRUD;
app.get('/', function(req, res, next) {
  res.send('Hello world! This is the home page.');
});

app.get('/teamOne', function(req, res, next) {
  res.send('Hello world! This is the team page.');
});

// Listener;
app.listen(3000, function() {
  console.log('Server is up and running!');
})
