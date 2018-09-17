
const Comment = require('../models/comment');

module.exports = (app) => {
    // New comment
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`);
            console.log(comment);
        }).catch((err) => {
            console.log(err.messsage)
        });
    });

    app.delete("/reviews/comments/:id", function(req, res) {
        console.log("Delete comment");
        Comment.findByIdAndRemove(req.params.id).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`)
        }).catch(err => {
            console.log(err.messsage);
        });
    });
};