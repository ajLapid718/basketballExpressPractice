const express = require('express');
const router = express.Router();
const models = require('../models/index.js');
const Team = models.Team;
const Player = models.Player;

module.exports = router;

// GET-PUT-POST-DELETE-CRUD;

// The homepage aka LocalHost:3000;
router.get('/', function(req, res, next) {
  res.send('Hello world! This is the home page.');
});

// An index page listing all of the teams;
router.get('/allTeams', function(req, res, next) {
  let allTeams = Team.findAll().then(function(teams) {
    res.json(teams);
  }).catch(err => console.log(err));
});

// An index page listing all of the players;
router.get('/allPlayers', function(req, res, next) {
  let allPlayers = Player.findAll().then(function(players) {
    res.json(players);
  }).catch(err => console.log(err));
});
