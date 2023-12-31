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
const MongoStore =  require('connect-mongo')(session);
const sassMiddleware  = require('node-sass-middleware');


//Used for Flash Messages
const flash = require('connect-flash');
const customMWare = require('./config/middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    //debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

//make uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts  ',true);



//Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//mongostrore is used to store the session cookie in
app.use(session({
    name:'Codial',
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

app.use(flash());
app.use(customMWare.setFlash);


//Use Express Router
app.use('/',require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running at port :${port}`);
})