const express=require('express');
const router=express.Router();
const Admin=require("../Models/Admin");
const User=require("../Models/User");
require('../DB/connection');



router.post('/alogin',async(req,res)=>
{
  console.log('hello from admin');
  const {aid,pass}=req.body;
  const match= await Admin.findOne({aid:aid});
  // const id=await User.findOne({email:email});  
  console.log(match);
  if(match)
  {
    const users=await User.find({});
    res.status(200).send({message:users});
  }
  else{
    res.status(500).send({error:"data not found"});
  }
})



module.exports=router;