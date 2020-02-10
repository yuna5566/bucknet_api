const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const UserController = require('../controllers/UserController')

router.post('/signup', UserController.user_sign_up);

router.post('/login', auth, UserController.user_log_in);

router.delete('/:userId', auth, UserController.delete_user);

module.exports = router;