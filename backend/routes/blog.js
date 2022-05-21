const express = require('express')
const { isAdmin } = require('../middleware/admin')
const { isAuth } = require('../middleware/auth')
const upload = require('../middleware/upload')
const { requireSignin } = require('../middleware/protected')
const { createBlog, updateBlog, removeBlog, singleBlog, readBlog, blogLists, blogRelated } = require ('../controllers/blogController')
const { userById } = require('../controllers/userController')


const router = express.Router()


router.post('/create/blog/:userId',requireSignin, isAuth, isAdmin, upload, createBlog )
router.put('/update/blog/:userId', requireSignin, isAuth, isAdmin, upload, updateBlog )
router.delete('/delete/blog/:blogId/:userId',requireSignin, isAuth, isAdmin, removeBlog )
router.get('/blog/:blogId', readBlog)
router.get('/blogs', blogLists)
router.get('/blogs/related/:blogId', blogRelated )



router.param('blogId', singleBlog)
router.param('userId', userById)

module.exports = router