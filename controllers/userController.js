const mongoose = require('mongoose');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Pull the registered User model off Mongoose.
const User = mongoose.model('User');

exports.showRegister = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};

/**
 * List of Validation Middleware for checking and cleaning
 * up the request body before adding the user and authenticating them.
 *
 * @type {*[]}
 */
exports.registerMiddleware  = [
    sanitizeBody('email').normalizeEmail(),
    check('email').isEmail().withMessage('Not a valid email'),
    check('firstName').not().isEmpty().withMessage('You must enter your first name'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
    check('password').not().isEmpty().withMessage('Password cannot be empty'),
    check('password').custom((value, { req }) => {
        if (value !== req.body.confirm_password)
            throw new Error('Password confirmation does not match');
        return true;
    }),
];

exports.createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors.array());
        return;
    }
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    });
    User.register(user, req.body.password, function(err) {
        if (err) return next(err);
        next(); // Lets go on, they are registered!
    })
};

exports.loginForm = (req, res) => {
    res.render('login', {
        title: 'Log into your Account'
    });
};

exports.login = passport.authenticate('local', {
    successRedirect: '/secret',
    successFlash: 'Login Successful',
    failureRedirect: '/login',
    failureFlash: 'Incorrect email/password pairs'
});

exports.logout = (req, res) => {
    req.logOut();
    res.flash('You have been successfully logged out.');
    res.redirect('/');
};