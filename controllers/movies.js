const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('9b163fe1b96985cd9be717ad6b2835b5');

module.exports = (app) => {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {movies: response.results });
        }).catch(console.error)
    });
};
