//reviews.js

const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = function(app) {

    app.get("/movies/:movieId/reviews/new", (req, res) => {
        res.render('reviews-new', {movieId: req.params.movieId});
    });

    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            Comment.find({ reviewId: req.params.id }).then(comments => {
                res.render('reviews-show', { review: review, comments: comments})
            })
        }).catch((err) => {
            console.log(err.message);
        });
    });

    app.get('/movies/:movieId/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        })
    })

    app.post('/movies/:movieId/reviews', (req, res) => {
        console.log("HELLO")
        Review.create(req.body).then((review) => {
            console.log(review);
            res.redirect(`/movies/${review.movieId}/reviews/${review._id}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    app.put('/movies/:movieId/reviews/:id/', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${review.movieId}/reviews/${review._id}`);
            })
            .catch(err => {
                 console.log(err.message)
            });
    });

    app.delete('/movies/:movieId/reviews/:id', function (req, res) {
        Review.findByIdAndRemove(req.params.id)
            .then((review) => {
                res.redirect(`/movies/${review.movieId}`);
            }).catch((err) => {
                console.log(err.message);
        });
    });

    app.get('/movies/:movieId/reviews', (req, res) => {
        Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log('ERROR: ', err);
        })
    })
}
