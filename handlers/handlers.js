// Import the necessary models and modules
const { Comment, Rating } = require('./models');

// Add a comment for a specific movie
async function addCommentHandler(req, res) {
  const { movie_id } = req.params;
  const { text } = req.body;

  try {
    const comment = new Comment({
      movie_id,
      text,
      // You can add other attributes as needed
    });

    await comment.save();
    console.log('Comment added successfully');
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Retrieve comments for a specific movie
async function getCommentsHandler(req, res) {
  const { movie_id } = req.params;

  try {
    const comments = await Comment.find({ movie_id }).exec();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add a rating for a specific movie
async function addRatingHandler(req, res) {
  const { movie_id } = req.params;
  const { rating } = req.body;

  try {
    const newRating = new Rating({
      movie_id,
      rating,
      // You can add other attributes as needed
    });

    await newRating.save();
    console.log('Rating added successfully');
    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Retrieve ratings for a specific movie
async function getRatingsHandler(req, res) {
  const { movie_id } = req.params;

  try {
    const ratings = await Rating.find({ movie_id }).exec();
    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { addCommentHandler, getCommentsHandler, addRatingHandler, getRatingsHandler };
