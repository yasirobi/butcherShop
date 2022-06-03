const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
// const fetch = require('node-fetch');



exports.register = async (req,res) => {
  const { email } = req.body;
  try {
    const existUser = await User.findOne({email: email})
    if(existUser){
      return res.status(403).json({
        error:'user already exist please signin'
      })
    }
         const user = new User(req.body)
            await user.save()
            user.hashed_password = undefined
            user.salt = undefined
            res.status(200).json({
                success:true,
                message:"you are signed up, please login",
                 user
               
            })
  } catch (err) {
    console.log(err);
  }

}


exports.signin = async (req,res) => {
  const { email, password } = req.body
  try {
      const user = await User.findOne({email:email})
      
       if(user){
         if(user.authenticate(password)){
          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
          res.cookie("token", token, { expire: new Date() + process.env.JWT_EXPIRES_IN },{httpOnly:true} );
          const { _id, email, name, role } = user;
           user.token = undefined
          
           res.json({ 
             success:true,
             token,
             message:`you are successfully logged in as ${name}`,
             user: { _id, email, name, role } });
          } 
          
       }
       else{
          return res.status(401).json({
            error:'you are not a valid user & please signup'
           })
         }
      } catch (error) {
      return res.status(500).json({
         error:error
       })
      }
}


exports.signout = async (req,res) => {
  res.cookie('token', 'none', {
    expires : new Date(Date.now()),
    httpOnly : true 
  });
  
  res.status(200).json({
    success : true,
    message : 'Logged out successfully.'
  });
}



exports.userById = async(req,res,next,id) => {
  try {
    const user = await User.findById(id)
    if(!user) return res.status(400).json({
      error:'user not found'
    })
    req.profile = user

    next()
  } catch (err) {
    console.log(err);
  }
}



exports.read = async (req,res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}