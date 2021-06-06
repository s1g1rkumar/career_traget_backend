const express=require('express');
const jwt=require('jsonwebtoken');
let cookieParser = require('cookie-parser');
const User=require('../Models/User');
let app = express();
app.use(cookieParser());
const Authenticate=async(req,res,next)=>
{
  try{
    console.log('hi from token');
    const token=req.cookies.jwtToken;
    if(token !== undefined)
    {
      console.log('reading token from cookies :',token);
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    console.log('verifyed Token by secret key :',verifyToken);
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
    if(!rootUser)
    {
      throw new Error('User not found');
    }
      req.token=token;
      req.rootUser=rootUser;
      req.userID=rootUser._id;
      console.log('data after token verify from backend :',token,rootUser);
      next();
    }
    else{
      console.log('please provide token');
      res.status(400).json({message:'please provide token'});
    }
  }catch(err)
  {
    res.status(401).send('Unauthorized : No taken provoede');
    console.log(err);
  }
}

module.exports=Authenticate;