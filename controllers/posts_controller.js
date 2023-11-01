const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
try{
    //console.log(req.user);
    let post= await Post.create({ 
        content:req.body.content,
        user: req.user._id});
    
        if(req.xhr){
            post= await post.populate('user','name');
            return res.status(200).json({
                data:{
                    post:post

                },
                message:"Post created!"
            });
        }
        return res.redirect('back');
       
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
   
        // console.log("Error in creating a post:",err);
        // return;
  
     
};


module.exports.destroy = async function(req,res){
    try{
        
        const post= await Post.findByIdAndRemove(req.params.id);
        //console.log("Post to be deleted is ",post);
        
        //.id for converting id to string
        if(post){

            let deleted= await Comment.deleteMany({post: req.params.id});



            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message: "Post deleted successfully"
                })
            }
            if(deleted){
                console.log("The post deleted",deleted);
                return res.redirect('back');
            } 
        }
        else{
            return res.redirect('back');
        }
        //return res.redirect('back')

    }
    catch(err){
        console.log("error in comment delete",err);
        return;
    }
};

