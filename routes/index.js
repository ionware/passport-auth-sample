const express = require('express');
const userController = require('../controllers/userController');
const { redirectIfAuthenticated } = require('../middlewares/authMiddleware');
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


module.exports = router;