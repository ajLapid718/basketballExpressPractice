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

Player.belongsTo(Team); // Gives each instance of Player a field called teamId;
Team.hasMany(Player);

module.exports = { db, Team, Player };
