const Post = require('../models/posts');


module.exports.home = async function (req,res){
   // return res.end('<h1> Express is up for Coding</h1>');
   //console.log(req.cookies);
   //res.cookie('User_id',394);

   // return res.render('home',{
   //  title:'My social Media|Home'
    
   // });

//const post_ = await Post.find();
//console.log(post_,":")


try {
   let posts = await Post.find({})
   .populate("user")
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   });

  return res.render("home" , {
           title: "Codeial", 
           posts: posts,
        });
} catch (err) {
   console.log(err);
   return ;
}
}