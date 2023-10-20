const express = require('express');
const router  = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile/:id',passport.checkAuthentication, userController.profile);

router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);

router.get('/signOut',userController.distroySession);
router.post('/create',function(req,res){
    userController.create});
router.post('/logout',function(req,res){
    userController.logout});

router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signIn'}
),userController.createSession);


//router.post('/logout',userController.logout);
//use passport as a middleware to authenticate
// router.post('/createSession',passport.authenticate(
//     'local',
//     {failureRedirect:'users/signIn'}
// ),userController.createSession);


module.exports = router;

