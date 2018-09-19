const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema ({
    createAt: {type: Date},
    updateAt: {type: Date},

    title: {
        type: String
    },
    content: {
        type: String
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Review'
    },
    movieId: {
        type: String,
        required: true
    }

});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;