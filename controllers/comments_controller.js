const Comment =  require('../models/comment');
const Post = require('../models/posts');




module.exports.create =  async function(req, res){
        try {
            console.log(req.body);
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