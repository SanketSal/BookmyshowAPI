const { Sequelize, Op } = require('sequelize');
const { updateRedisCache, getDataFromCache } = require('./helpers');
const { Theatre, Movie, Showtime, Seat } = require('./models');

// Handlers
async function getDatesHandler(req, res) {
  const { theatre_id } = req.params;
  try {
    const redisKey = { theatre_id };
    const cachedDates = await getDataFromCache(redisKey);

    if (cachedDates) {
      console.log('Dates fetched from Redis cache');
      res.json(cachedDates);
    } else {
      const dates = await Showtime.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('show_date')), 'show_date'],
        ],
        where: {
          theatre_id: theatre_id,
          show_date: { [Op.gte]: new Date() },
        },
        order: ['show_date'],
        limit: 7,
      });

      await updateRedisCache(redisKey, dates);

      console.log('Dates fetched from database and cached in Redis');
      res.json(dates.map((date) => date.show_date));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getMoviesHandler(req, res) {
  const { theatre_id, show_date } = req.params;
  try {
    const redisKey = { theatre_id, show_date };
    const cachedMovies = await getDataFromCache(redisKey);

    if (cachedMovies) {
      console.log('Movies fetched from Redis cache');
      res.json(cachedMovies);
    } else {
      const movies = await Movie.findAll({
        attributes: ['movie_id', 'title'],
        include: [
          {
            model: Showtime,
            attributes: ['show_time'],
            where: {
              theatre_id: theatre_id,
              show_date: show_date,
            },
            include: [
              {
                model: Seat,
                attributes: ['seat_number', 'is_booked'],
              },
            ],
          },
        ],
      });

      const formattedMovies = movies.map((movie) => ({
        movie_id: movie.movie_id,
        title: movie.title,
        showtimes: movie.Showtimes.map((showtime) => ({
          show_time: showtime.show_time,
          available_seats: showtime.Seats.filter((seat) => !seat.is_booked).map(
            (seat) => seat.seat_number
          ),
        })),
      }));

      await updateRedisCache(redisKey, formattedMovies);

      console.log('Movies fetched from database and cached in Redis');
      res.json(formattedMovies);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function bookSeatsHandler(req, res) {
  const { theatre_id, showtime_id } = req.params;
  const { seats } = req.body;

  try {
    // Fetch the selected showtime and associated seats
    const showtime = await Showtime.findByPk(showtime_id, {
      include: [Seat],
    });

    // Check if any of the selected seats are already booked
    const alreadyBookedSeats = showtime.Seats.filter((seat) =>
      seats.includes(seat.seat_number) && seat.is_booked
    );

    if (alreadyBookedSeats.length > 0) {
      return res.status(400).json({ error: 'Some seats are already booked' });
    }

    // Update seat booking status in the database and Redis cache
    const bookedSeats = await Seat.update(
      { is_booked: true },
      {
        where: {
          showtime_id: showtime_id,
          seat_number: { [Op.in]: seats },
        },
        returning: true,
      }
    );

    // Update Redis cache with the latest seat booking status
    await updateRedisCache(showtime_id, bookedSeats.map((seat) => seat.seat_number));

    console.log('Seats booked successfully');
    res.json({ message: 'Seats booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getDatesHandler, getMoviesHandler, bookSeatsHandler };
