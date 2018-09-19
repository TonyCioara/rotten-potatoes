const mongoose = require('mongoose');


    // const Schema = mongoose.Schema;


const ReviewSchema = new mongoose.Schema ({
    createAt: {type: Date},
    updateAt: {type: Date},

    description: {
        type: String
    },
    reviewTitle: {
        type: String
    },
    rating: {
        type: Number
    },
    movieId: {
        type: String,
        required: true
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
