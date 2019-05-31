const express = require('express');
const secretController = require('../controllers/secretController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', isLoggedIn, secretController.indexPage);

module.exports = router;