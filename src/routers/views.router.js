import express from 'express';
import passport from 'passport';

const router = express.Router();

// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Middleware 
const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/profile');
};

// Render Login Page (Accessible only for guests)
router.get('/login', ensureGuest, (req, res) => {
    res.render('login', { title: 'Login' });
});

// Render Register Page (Accessible only for guests)
router.get('/register', ensureGuest, (req, res) => {
    res.render('register', { title: 'Register' });
});

// Render Profile Page (Requires Authentication)
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { title: 'Profile', user: req.user });
});

export default router;

