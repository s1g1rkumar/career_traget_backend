const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('../DB/connection');
const User=require('../Models/User');


router.post('/signin',async(req,res)=>
{
  try{
    let token;
    const{email,password}=req.body;
    console.log(email,password);
    if(!email || !password)
    {
     return  res.status(422).json({message:"please fill all the field"});
    
    }
    const id=await User.findOne({email:email});  
    if(id)
    {
      const isMatch=await bcrypt.compare(password,id.password);
      token=await id.generateAuthToken();
      console.log(token);
      res.cookie("jwtToken",token,
      {
        expires:new Date(Date.now()+25892000000),
        httpOnly:true
      });
    
      if(!isMatch)
      {
      res.status(400).json({message:"Invalid Credientials"});
      }
      else{
      res.status(200).json({message:id});    
      } 
    }
    else{
      res.status(500).json({message:"unable to signin"});    
    }   
    return;
  }catch(err)
  {
    console.log(err);
    return;
  }
  //res.send('hello from signin')
})


module.exports=router;