{   //Method to submit form data for new post using Ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    // let newPost = newPostDom(data.data.post);
                    // $('#posts-list-container>ul').prepend(newPost);
                },
                error: function (err) { console.log(err.responseText); }
            });

        });
    }

    //Method to create a post in DOM





    createPost();
}