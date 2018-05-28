const models = require('./models/index.js');
const Team = models.Team;
const Player = models.Player;
const everyTeam = require('./teamDataFromNBA.js');

function populateDatabase() {
  // Team Seeds for All Thirty NBA Teams;
  for (let i = 0; i < everyTeam.length; i++) {
    let currentTeam = everyTeam[i];
    let currentTeamCityName = currentTeam.location;
    let currentTeamSportsName = currentTeam.simpleName;
    Team.create({
      cityName: currentTeamCityName,
      teamName: currentTeamSportsName
    })
  }
  // Player Seeds;
  Player.create({
    fullName: 'Dwyane Wade',
    jerseyNum: 3,
    position: 'SG',
    teamId: 16,
    teammateId: 16
  });

  Player.create({
    fullName: 'Jayson Tatum',
    jerseyNum: 0,
    position: 'SF',
    teamId: 2,
    teammateId: 2
  });

  Player.create({
    fullName: 'Kristaps Porzingis',
    jerseyNum: 6,
    position: 'PF',
    teamId: 20,
    teammateId: 20
  });

  Player.create({
    fullName: 'Kyrie Irving',
    jerseyNum: 11,
    position: 'PG',
    teamId: 2,
    teammateId: 2
  });
};

module.exports = { populateDatabase };
