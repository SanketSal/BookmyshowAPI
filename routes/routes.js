const express = require('express');
const { addCommentHandler, getCommentsHandler, addRatingHandler, getRatingsHandler } = require('./handlers');
const router = express.Router();

router.post('/movies/:movie_id/comments', addCommentHandler);
router.get('/movies/:movie_id/comments', getCommentsHandler);
router.post('/movies/:movie_id/ratings', addRatingHandler);
router.get('/movies/:movie_id/ratings', getRatingsHandler);

module.exports = router;
