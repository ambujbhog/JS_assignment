'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var myitemModel = require('../models/myitem'); 
var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/', function (req, res) { //Is used for my content page that is going to have the ads 
    try {
        //Retrieve all ads if there is any 
        myitemModel.find({}, function (err, foundmyitem) {
            console.log(err);
            console.log(foundmyitem); 

           
            res.render('file', { myitems: foundmyitem});
        });
    } catch (err) {
        console.log(err);
        res.render('file', { filePage: 'Login Successful' });
    }
});

module.exports = router;