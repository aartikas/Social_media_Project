const Post = require('../models/posts')

module.exports.create = function(req,res){
    // Post.create({
    //     content:req.body.content,
    //     user: req.user._id
    // }, function(err,post){
    //     if(err){
    //         console.log("Error in creating a post:",err);
    //         return;
    //     }
    //     return res.redirect('back');
    // });
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