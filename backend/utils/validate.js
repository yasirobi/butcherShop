const { check, validationResult } = require('express-validator')


exports.validSignUp = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 3,
        max: 32
    }).withMessage('name must be between 3 to 32 characters'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]

exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]


exports.isRequestValidated = async = (req,res,next) =>{
    const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    next()
    }