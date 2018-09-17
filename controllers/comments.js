
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
};