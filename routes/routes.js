const express = require('express');
const { getMovieDetailsHandler } = require('./handlers');
const router = express.Router();

// Define your routes here
router.get('/movies/:movie_id/details', getMovieDetailsHandler);

module.exports = router;
