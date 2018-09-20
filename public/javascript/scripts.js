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
                    <div class="card">
                        <div class="card-block">
                            <h4 class="card-title">${response.data.comment.title}</h4>
                            <p class="card-text">${response.data.comment.content}</p>
                            <p>
                                <form method="POST" action="/movies/${response.data.comment.movieId}/reviews/${response.data.comment.reviewId}/comments/${response.data.comment._id}?_method=DELETE">
                                    <button class="btn btn-link" type="submit">Delete</button>
                                </form>
                            </p>
                        </div>
                    </div>
                    `
                );
            }).catch(error => {
                console.log(error)
            })
    })
})
