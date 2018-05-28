const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/basketball', {logging: false});

let Team = db.define('team', {

  cityName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  teamName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  fullTeamName: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.getDataValue('cityName') + ' ' + this.getDataValue('teamName');
    }
  }

});

let Player = db.define('player', {

  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  position: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      len: [1,2]
    }
  },

  jerseyNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [1,2]
    }
  }

});

Player.prototype.gatherTeammates = async function() {
  let targetTeamId = this.teamId;

  let arrayOfTeammates = await Player.findAll({
    where: {
      teamId: targetTeamId
    }
  })

  this.teammates = [];

  for (let i = 0; i < arrayOfTeammates.length; i++) {
    let teammate = arrayOfTeammates[i];
    if (teammate.fullName === this.fullName) continue;
    this.teammates.push(teammate);
  }

  this.setTeammates(this.teammates);
  // what this is doing: take this instance of a player...then set his teammates to be a player with a playerId of 1 (Dwyane Wade);
  // what we want: take this instance of a player...then set his teammates to be any and all players who have the same teamId;
}

Player.belongsToMany(Player, {as: "teammates", through: "teammate_table"})
Player.belongsTo(Team); // Gives each instance of Player a field called teamId;
Team.hasMany(Player); // When viewing a team JSON object, an array of players is available;

module.exports = { db, Team, Player };
