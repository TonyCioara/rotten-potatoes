const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY);
const Review = require('../models/review');

module.exports = (app) => {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {movies: response.results });
        }).catch(console.error);
    });

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({id: req.params.id})
            .then(movie => {
                if (movie.video) {
                    moviesdb.movieVideos( {id:req.params.id}).then(videos => {
                        movie.trailer_youtube_id = videos.results[0].key;
                    });
                };

                Review.find({movieId: req.params.id}).then(reviews => {
                    console.log("2.")
                    console.log(reviews)
                    res.render('movies-show', {movie: movie, reviews: reviews});
                }).catch(console.error);

            }).catch(console.error.message);
    });
};
