import express from 'express';
import passport from 'passport';

const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/profile');
};

router.get('/login', ensureGuest, (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/register', ensureGuest, (req, res) => {
    res.render('register', { title: 'Register' });
});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { title: 'Profile', user: req.user });
});

export default router;

