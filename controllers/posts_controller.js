const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = function(req,res){

    console.log(req.user);
    Post.create({ 
        content:req.body.content,
        user: req.user._id})
    .then(()=>{
        return res.redirect('back');}
    )
    .catch((err)=>{
        console.log("Error in creating a post:",err);
        return;
     })
     
};


module.exports.destroy = async function(req,res){
    try{
        
        const post= await Post.findByIdAndRemove(req.params.id);
        
        //.id for converting id to string
        if(post){

            let deleted= await Comment.deleteMany({post: req.params.id});
            if(deleted){
                console.log("The post deleted",deleted);
                return res.redirect('back');
            } 
        }
        else{
            return res.redirect('back');
        }

    }
    catch(err){
        console.log("error in comment delete",err);
        return;
    }
};