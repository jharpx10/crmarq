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
<<<<<<< HEAD
    res.redirect('/admin/purchase');
=======
    res.render('purchase/purchase');
>>>>>>> 322793dbcdb89141739ab9ed0de3dd79fe3c0b76
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();//Es un metodo de passport
    res.redirect('/signin');
});
module.exports = router;