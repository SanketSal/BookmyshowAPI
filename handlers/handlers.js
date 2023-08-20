async function getMovieDetailsHandler(req, res) {
  const { movie_id } = req.params;
  try {
    const movieDetails = await MovieDetail.findOne({
      where: { movie_id: movie_id },
    });

    if (!movieDetails) {
      return res.status(404).json({ error: 'Movie details not found' });
    }

    res.json(movieDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getMovieDetailsHandler };
