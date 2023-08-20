const MovieDetail = sequelize.define('MovieDetail', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cast: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  crew: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plot: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  runtime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other attributes as needed
});

// Define association with Movie model (assuming each Movie has a corresponding MovieDetail)
Movie.hasOne(MovieDetail, { foreignKey: 'movie_id' });
