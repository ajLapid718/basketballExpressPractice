const express = require('express');
const router = express.Router();

module.exports = router;

// GET-PUT-POST-DELETE-CRUD;
router.get('/', function(req, res, next) {
  res.send('Hello world! This is the home page.');
});

router.get('/teamOne', function(req, res, next) {
  res.send('Hello world! This is the team page.');
});
