const express = require('express');


const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Router loaded");

router.get('/',homeController.home)

//for any routes, access here router.use('/routerName',require(./routerFile))
router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));



module.exports = router;
