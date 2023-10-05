const User = require('../models/users');



module.exports.profile = function(req,res){
    //return res.end('<h1>User Profile</h1>');
    return res.render('user_profile',{
        title:'profile!',

    });
}
//Render Sign Up Page
module.exports.signUp = function(req,res){
    return res.render('user_signUp',{
        title: 'Social Media| Sign up'
    });
}

//render Sign In Page
module.exports.signIn = function(req,res){
    return res.render('user_signIn',{
        title: 'Social Media| Sign In'
    })
}

//get the sign up data
module.exports.create= function(req,res){
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email})
    .then((user)=>{
        console.log("User found");
        if(!user){
            User.create(req.body)
            .then(()=>{
                return res.redirect('/users/signIn');})
            
            .catch((err)=>{
                console.log("Error in Creating User while signing up",err);
                return;
            });
        }
        else{
            return res.redirect('back');
        }    

        })
    .catch((err)=>
    {console.log("Error in finding User");
    return;});

}


//Signin and create a session for the user
module.exports.createSession = function(req,res){

    //find the user
    User.findOne({email:req.body.email})
    .then((user)=>{

    if(user){   
    //handle password mismatch
        if(user.password!=req.body.password){
            return res.redirect('back');
        }

        
    //handle session creation
    res.cookie('user_id',user.id);
    return res.redirect('/users/profile');

    }
    else{
    //handle user not found
    return res.redirect('back');


    }

    })
    .catch((err)=>
    {if(err){
            
        console.log("Error in finding user in signing in"); 
        return;}
    });
  
}