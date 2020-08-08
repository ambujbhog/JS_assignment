'use strict';
var express = require('express');
var router = express.Router();
var myitemModel = require('../models/myitem');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
    try {
        //Retrieve all myitem if there is any 
        myitemModel.find({}, function (err, foundmyitem) {
            console.log(err);
            console.log(foundmyitem);
            //Pass found myitem from server to pug file
            res.render('index', { myitems: foundmyitem });
        });
    } catch (err) {
        console.log(err);
        res.render('index', { title: 'Express' });
    }
});

/* GET insert page. */
router.get('/insert', function (req, res) {
    res.render('insert');
});

/* POST insert page */
router.post('/insert', function (req, res) {
    //Create a new article using the myitem Model Schema
    const myitem = new myitemModel({ name: req.body.name, description: req.body.description });
    //Insert article into DB
    myitem.save(function (err) {
        console.log(err);
        res.redirect('/');
    });
});

/* GET update page */
router.get('/update/:id', function (req, res) {
    myitemModel.findById(req.params.id, function (err, foundmyitem) {
        if (err) console.log(err);
        //Render update page with specific article
        res.render('update', { myitem: foundmyitem })
    })
});

/* POST update page */
router.post('/update', function (req, res) {
    console.log(req.body);
    //Find and update by id
    myitemModel.findByIdAndUpdate(req.body.id, { name: req.body.name, description: req.body.description }, function (err, model) {
        console.log(err);
        res.redirect('/');
    });
});

/* POST delete page */
router.post('/delete/:id', function (req, res) {
    //Find and delete article
    myitemModel.findByIdAndDelete(req.params.id, function (err, model) {
        res.redirect('/');
    });
});

/*POST for login*/
//Try to login with passport
router.post('/login', passport.authenticate('local', {
    successRedirect: '/file',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/*Logout*/
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

/*POST for register*/
router.post('/register', function (req, res) {
    //Insert user
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        var registerUser = {
            username: req.body.username,
            password: hash
        }
        //Check if user already exists
        userModel.find({ username: registerUser.username }, function (err, user) {
            if (err) console.log(err);
            if (user.length) return res.redirect('/login');
            const newUser = new userModel(registerUser);
            newUser.save(function (err) {
                console.log('Inserting');
                if (err) console.log(err);
                req.login(newUser, function (err) {
                    console.log('Trying to login');
                    if (err) console.log(err);
                    return res.redirect('/');
                });
            });
        });
    })
});

/*GET for register*/
router.get('/register', function (req, res) {
    res.render('register');
});

/*GET for login*/
router.get('/login', function (req, res) {
    res.render('login');
});

module.exports = router;

module.exports = router;
