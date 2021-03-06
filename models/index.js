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
  let teammates = await Player.findAll({
    where: {
      teamId: this.teamId
    }
  })

  this.setTeammates(teammates);
  // what we want: take an instance of a player...then set his teammates to be any and all players who have the same teamId;
}

Player.addHook("afterCreate", player => {
  player.gatherTeammates();
})

Player.belongsTo(Team); // One-To-One: Gives each instance of Player a field called teamId. When viewing a player JSON object, we can eager load and include their associated team;
Team.hasMany(Player); // One-To-Many: Gives each instance of Team the accessors of getPlayers() and setPlayers(). When viewing a team JSON object, an array of players is available;
Player.hasMany(Player, {as: "teammates"}) // Many-To-Many;

module.exports = { db, Team, Player };
