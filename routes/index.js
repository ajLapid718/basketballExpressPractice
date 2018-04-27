const express = require('express');
const router = express.Router();
const models = require('../models/index.js');
const Team = models.Team;
const Player = models.Player;

module.exports = router;

// GET-PUT-POST-DELETE-CRUD;
// INDEX-SHOW-NEW-CREATE-EDIT-UPDATE-DESTROY;

// The homepage aka LocalHost:3000;
router.get('/', function(req, res, next) {
  res.send('Hello world! This is the home page.');
});

// An index page listing all of the teams aka LocalHost:3000/allTeams;
router.get('/allTeams', function(req, res, next) {
  let allTeams = Team.findAll().then(function(teams) {
    res.json(teams);
  }).catch(err => console.log(err));
});

// An index page listing all of the players aka LocalHost:3000/allPlayers;
router.get('/allPlayers', function(req, res, next) {
  let allPlayers = Player.findAll().then(function(players) {
    res.json(players);
  }).catch(err => console.log(err));
});

/* A show page listing one specific team aka LocalHost:3000/Boston;
router.get('/:cityName', function(req, res, next) {
  let targetCityName = req.params.cityName;
  Team.findOne({where: {
    cityName: targetCityName
  }}).then(function(target) {
    res.json(target);
  }).catch(err => console.log(err));
});
*/

// A show page listing one specific team aka LocalHost:3000/team/1;
router.get('/team/:id', function(req, res, next) {
  let targetTeamID = req.params.id;
  Team.findById(targetTeamID).then(function(target) {
    res.json(target);
  }).catch(err => console.log(err));
});

// An add page to add a player to the database aka LocalHost:3000/player/add;
router.get('/player/add', function(req, res, next) {
  res.sendFile('addPlayer.html', {'root': 'views'}); // specify root directory where html file is housed for file path;
})

// A POST route to successfully add a player;
router.post('/', function(req, res, next) { // figure out significance and effects of '/' for route in this case;
  let newPlayer = Player.build({
    fullName: req.body.fullName,
    jerseyNum: req.body.jerseyNum,
    position: req.body.position
  });

  newPlayer.save().then(function(successfulPlayer) {
    res.json(successfulPlayer);
    console.log("Successfully saved to the database!");
  });
})

// A show page listing one specific player aka LocalHost:3000/player/1;
router.get('/player/:id', function(req, res, next) {
  let targetPlayerID = req.params.id;
  Player.findById(targetPlayerID).then(function(target) {
    res.json(target);
  }).catch(err => console.log(err));
});
