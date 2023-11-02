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
                    //console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-botton'),newPost);
                },
                error: function (err) { console.log(err.responseText); }
            });

        });
    }

    //Method to create a post in DOM
    let newPostDom = function(post){
        //console.log(post.user);
        //console.log(post.user.name);
        return $(`
                <li id="post-${post._id}">
                <p>

                    <small>
                            <a class="delete-post-botton" href ="/posts/destroy/${post._id}">X</a>
                    </small>

                    <li>${post.content}
                    <br>
                    <small>${post.user.name}
                    </small>
                    </li>
                    </p>
                    <div class="post-comment">
                
                            <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Add Comments.." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                            </form>
                    </div>
                
                    <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
  

                            </ul>
                    </div>
                
                </li>
        `);
    }


    //Method to delete a post formDOM
    let deletePost = function(deleteLink){

        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    //console.log(data);
                    //console.log(data._id);

                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(data){
                    console.log(error.responseText);
                }
            })

        })
    }



    createPost();
}