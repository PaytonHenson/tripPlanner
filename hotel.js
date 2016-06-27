var Sequelize = require('sequelize');
var db = require('./index');
var Place = require('./place');

var Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_stars: {
    type: Sequelize.ENUM(1, 2, 3, 4, 5)
  },
  amenities: {
    type: Sequelize.TEXT
  }
});

Hotel.belongsTo(Place);

module.exports = Hotel;
