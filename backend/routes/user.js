const express = require('express');
const { register, signin, signout, userById, read } = require('../controllers/userController');
const { validSignUp, isRequestValidated, validLogin } = require('../utils/validate');
const { isAuth } = require('../middleware/auth');
const { requireSignin } = require('../middleware/protected');

const router = express.Router()

router.post('/register', validSignUp, isRequestValidated, register)
router.post('/signin', validLogin, isRequestValidated, signin)
router.get('/signout', signout)
router.get('/user/:userId', requireSignin, isAuth, read )



router.param('userId', userById)

module.exports = router