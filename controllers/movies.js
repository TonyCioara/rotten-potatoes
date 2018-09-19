const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('9b163fe1b96985cd9be717ad6b2835b5');

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
                        renderTemplate(movie);
                    });
                } else {
                    renderTemplate(movie);
                };

                function renderTemplate(movie)  {
                    res.render('movies-show', { movie: movie });
                };

            }).catch(console.error);
    });
};
