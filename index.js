const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const cookieParser = require('cookie-parser');

//Used for Session-Cookies
const session = require('express-session');
const passport = require('passport'); 
const passportLocal  = require('./config/passport_local_strategy');




app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts  ',true);



//Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Social Media Development',
    secret:'secret_1',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Use Express Router

app.use('/',require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running at port :${port}`);
})