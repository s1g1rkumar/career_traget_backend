const express=require('express');
const router=express.Router();
const User=require('../Models/User');
const authenticate=require('../Middleware/authenticate');
require('../DB/connection');


router.get('/profile',authenticate,(req,res)=>
{
  console.log('hello from profile section');
  res.send(req.rootUser);
})

module.exports=router;