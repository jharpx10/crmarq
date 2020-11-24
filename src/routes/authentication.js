const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('authorization/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin', 
        failureFlash: true
    })(req, res, next)
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.send('This is your profile');
});
module.exports = router;