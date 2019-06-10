const express = require('express');
const userController = require('../controllers/userController');
const { redirectIfAuthenticated } = require('../middlewares/authMiddleware');
const passportFacebook = require('../config/facebook');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Secret Message Inside'
    });
});

router.get('/register',
    redirectIfAuthenticated,
    userController.showRegister
);

router.post('/register',
    redirectIfAuthenticated,
    userController.registerMiddleware,
    userController.createUser,
    userController.login
);

router.get('/login', redirectIfAuthenticated, userController.loginForm);
router.post('/login', redirectIfAuthenticated, userController.login);

router.get('/logout', userController.logout);


/*
* Facebook Authentication and Authorization
* */
router.get('/auth/facebook',
    passportFacebook.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passportFacebook.authenticate('facebook', {
    failureRedirect: '/login'
}), (req, res) => res.redirect('/secret'));


module.exports = router;