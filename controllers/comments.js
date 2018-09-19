
const Comment = require('../models/comment');

module.exports = (app) => {
    // New comment
    app.post('/movies/:movieId/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.redirect(`/movies/${comment.movieId}/reviews/${comment.reviewId}`);
            console.log(comment);
        }).catch((err) => {
            console.log(err.messsage)
        });
    });

    app.delete("/movies/:movieId/reviews/:reviewId/comments/:id", function(req, res) {
        console.log("Delete comment");
        Comment.findByIdAndRemove(req.params.id).then(comment => {
            res.redirect(`/movies/${comment.movieId}/reviews/${comment.reviewId}`)
        }).catch(err => {
            console.log(err.messsage);
        });
    });
};