const express = require('express');
const { create, update, read,categoryById, list, remove } = require('../controllers/categoryController');
const { userById } = require('../controllers/userController');
const { isAdmin } = require('../middleware/admin');
const { isAuth } = require('../middleware/auth');
const { requireSignin } = require('../middleware/protected');
const { validCategory, isRequestValidated } = require('../utils/validate');

const router = express.Router()

router.get('/categories', list)
router.get('/category/:categoryId', read )
router.post('/create/category/:userId', validCategory, isRequestValidated, requireSignin, isAuth, isAdmin, create)
router.put('/category/:categoryId/:userId',requireSignin, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId' ,requireSignin, isAuth, isAdmin, remove )



router.param('categoryId', categoryById);
router.param('userId', userById);


module.exports = router