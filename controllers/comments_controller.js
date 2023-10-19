const Comment =  require('../models/comment');
const Post = require('../models/posts');




module.exports.create =  async function(req, res){
        try {
            //console.log(req.body);
            const post = await Post.findById(req.body.post);
            if (post) {
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
                post.comments.push(comment);
                post.save();
            }
            return res.redirect('/');
        }catch (err) {
            console.log("error in comment create",err);
            return;
        }
    

}

module.exports.destroy =  async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id);
        //console.log("Comment found is",comment);
        if(comment){
            let postID = comment.post;
            await Post.findByIdAndRemove(req.params.id)
            await Post.findByIdAndUpdate(postID,{$pull:{comments:req.params.id}}) ;
            return res.redirect('back');

        }
    }
    catch(err){

            console.log("error in comment delete",err);
            return;
    }

}