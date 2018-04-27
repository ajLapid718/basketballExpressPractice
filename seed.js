const models = require('./models/index.js');
const Team = models.Team;
const Player = models.Player;

function populateDatabase() {
  // Team Seeds;
  Team.create({
    cityName: 'Miami',
    teamName: 'Heat'
  });

  Team.create({
    cityName: 'New York',
    teamName: 'Knicks'
  });

  Team.create({
    cityName: 'Boston',
    teamName: 'Celtics'
  });
  // Player Seeds;
  Player.create({
    fullName: 'Dwyane Wade',
    jerseyNum: 3,
    position: 'SG'
  });

  Player.create({
    fullName: 'Kristaps Porzingis',
    jerseyNum: 6,
    position: 'PF'
  });

  Player.create({
    fullName: 'Kyrie Irving',
    jerseyNum: 11,
    position: 'PG'
  });
};

module.exports = { populateDatabase };
