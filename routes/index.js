const express = require('express');


const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Router loaded");

router.get('/',homeController.home)

//for any routes, access here router.use('/routerName',require(./routerFile))
router.use('/users', require('./users'))





module.exports = router;
