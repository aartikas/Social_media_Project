const mongoose =  require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Social_media_development')

const db= mongoose.connection;

db.on('error',console.error.bind(console, "Error in connecting to Mongo DB"));

db.once('open',function(){
    console.log('Connected DB')
});

module.exports = db;