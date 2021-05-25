const jwt=require('jsonwebtoken');
const User=require('../Models/User');
const Authenticate=async(req,res,next)=>
{
  try{
    console.log('hi from token');
    const token=req.cookies.jwtToken;
    console.log('profile token',token);
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    console.log('verifyToken',verifyToken);
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
    if(!rootUser)
    {
      throw new Error('User not found');
    }
      req.token=token;
      req.rootUser=rootUser;
      req.userID=rootUser._id;
      console.log('token id',token,rootUser);
      next();
  }catch(err)
  {
    res.status(401).send('Unauthorized : No taken provoede');
    console.log(err);
  }
}

module.exports=Authenticate;