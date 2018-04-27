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
  }

});

let Player = db.define('player', {

  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  position: {
    type: Sequelize.STRING,
    allowNull: false
  },

  jerseyNum: {
    type: Sequelize.INTEGER,
  }

});

module.exports = { db, Team, Player };
