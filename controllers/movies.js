const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('9b163fe1b96985cd9be717ad6b2835b5');
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
                console.log("1.")

                Review.find({movieId: req.params.id}).then(reviews => {
                    console.log(reviews)
                    res.render('movies-show', {movie: movie, reviews: reviews});
                }).catch(console.error);

            }).catch(console.error);
    });
};
