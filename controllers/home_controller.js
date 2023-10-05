module.exports.home = function(req,res){
   // return res.end('<h1> Express is up for Coding</h1>');
   console.log(req.cookies);
   res.cookie('User_id',394);
    return res.render('home',{
        title:'Home',

    });
}