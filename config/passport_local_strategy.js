const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User= require('../models/users');


//Authentication using Passport, 
passport.use(new LocalStrategy({
    usernameField:'email',
    },
    function(email,password,done){

        //find user & establish identity
        User.findOne({email:email})
        .then((user)=>{
            if(!user || user.password != password){
                console.log("Invalid Username/Password");
                return done(null,false);
            }
            return done(null,user);
        })
        .catch((err)=>{
            console.log("Error in finding user in passport");
            return done(err);
        })
    }   
));

//serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//Deserialisng the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>
        {return done(null,user);})
    .catch((err)=>{
        console.log("Error in finding user in passport1");
        return done(err);
    });
    
});


//check if user in Authenticated
passport.checkAuthentication = function(req,res,next){
        //If the user is signed in, pass on the request to the next function(controller's action)
        if(req.isAuthenticated()){
            return next();
        }
        //If user is not authenticated
        return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function (req,res,next){
    if (req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are sending this to the locals for the views
        res.locals.user = req.user;
    }
    next(); 
}




module.exports = passport;  