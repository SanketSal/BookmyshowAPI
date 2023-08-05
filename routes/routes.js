const express = require('express');
const { getDatesHandler, getMoviesHandler, bookSeatsHandler } = require('./handlers');

const router = express.Router();

router.get('/theatres/:theatre_id/dates', getDatesHandler);
router.get('/theatres/:theatre_id/movies/:show_date', getMoviesHandler);
router.post('/theatres/:theatre_id/movies/:showtime_id/book', bookSeatsHandler);

module.exports = router;
