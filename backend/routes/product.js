const express = require('express');
const { create, update, read, singleProduct, lists, listRelated, listCategories, remove } = require('../controllers/productController');
const uploadMulter = require('../middleware/upload')
const { userById } = require('../controllers/userController');
const { isAdmin } = require('../middleware/admin');
const { isAuth } = require('../middleware/auth');
const { requireSignin } = require('../middleware/protected');

const router = express.Router()

router.post('/create/:userId',requireSignin, isAuth, isAdmin, uploadMulter, create)
router.put('/product/:productId/:userId', uploadMulter ,requireSignin, isAuth, isAdmin, update)
router.get('/product/:productId', read)
router.get('/products', lists)
router.get('/products/related/:productId', listRelated )
router.get('/products/categories', listCategories)
router.delete('/product/:productId/:userId',requireSignin, isAuth, isAdmin, remove )


router.param('productId', singleProduct)
router.param('userId', userById )

 
module.exports = router