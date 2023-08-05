const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_mysql_username', 'your_mysql_password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Models
const Theatre = sequelize.define('Theatre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Showtime = sequelize.define('Showtime', {
  show_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  show_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

const Seat = sequelize.define('Seat', {
  seat_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_booked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Define Associations
Theatre.hasMany(Showtime, { foreignKey: 'theatre_id' });
Movie.hasMany(Showtime, { foreignKey: 'movie_id' });
Showtime.hasMany(Seat, { foreignKey: 'showtime_id' });

// Sync the models with the database
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected and models synced.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

module.exports = { Theatre, Movie, Showtime, Seat };
