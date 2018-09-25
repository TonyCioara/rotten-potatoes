// javascript/scripts.js


axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
    .then(response => {
        alert(response.hex.value);
    }).catch(error => {
        console.log(error);
    });

// listen for a form submit event
$(document).ready(() => {
    document.getElementById("newComment").addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();
    
        // serialize the form data into an object
        let comment = $('#newComment').serialize();
        console.log(`comment: ${comment}`)
        // use axios to initialize a post request and send in the form data
        axios.post(`/movies/${comment.movieId}/reviews/${comment.reviewId}/comments`, comment)
            .then(response => {
                console.log(response);
                document.getElementById("newComment").reset();
                // Display the data as a new comment on the page
                $('#comments').prepend(
                    `
                    <div class="card" id=${response.data.comment._id}>
                        <div class="card-block">
                            <h4 class="card-title">${response.data.comment.title}</h4>
                            <p class="card-text">${response.data.comment.content}</p>
                            <p>
                                <button class="btn btn-link delete-comment" id=${response.data.comment._id} data-movie-id=${response.data.comment.movieId} data-review-id=${response.data.comment.reviewId} data-comment-id=${response.data.comment._id}>Delete</button>
                            </p>
                        </div>
                    </div>
                    `
                );
            }).catch(error => {
                console.log(error);
            });
    });

    document.querySelector('.delete-comment').addEventListener('click', function(e) {
        console.log('comment');
        let commentId = this.getAttribute('data-comment-id');
        let movieId = this.getAttribute('data-movie-id');
        let reviewId = this.getAttribute('data-review-id');
        console.log(`YOUR ROUTE IS: /movies/${movieId}/reviews/${reviewId}/comments/${commentId}`)
        axios.delete(`/movies/${movieId}/reviews/${reviewId}/comments/${commentId}`)
                .then(response => {
                    console.log("Response: " + response);
                    let comment = document.getElementById(commentId);
                    comment.parentNode.removeChild(comment);
                })
                .catch(error => {
                    console.log(error);
                    alert('There was an error deleting this comment.');
                });
        });
})
