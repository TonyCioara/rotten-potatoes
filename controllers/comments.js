
const Comment = require('../models/comment');

module.exports = (app) => {
    // New comment
    app.post('/movies/:movieId/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            // res.redirect(`/movies/${comment.movieId}/reviews/${comment.reviewId}`);
            console.log(comment);
            res.status(200).send({ comment: comment });
        }).catch((err) => {
            res.status(400).send({ err: err })
            console.log(err.messsage)
        });
    });

    app.delete("/movies/:movieId/reviews/:reviewId/comments/:id", function(req, res) {
        console.log("Delete comment");
        Comment.findOneAndRemove({_id : req.params.id}).then(comment => {
            res.status(200).send(comment);
        }).catch(err => {
            console.log(err.messsage);
            res.status(400).send(err);
        });
    });
};