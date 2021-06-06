const express=require('express');
const router=express.Router();
const User=require('../Models/User');
const authenticate=require('../Middleware/authenticate');
require('../DB/connection');


router.get('/getData',authenticate,(req,res)=>
{
  console.log('hello from getData section');
  res.status(200).send(req.rootUser);
  //res.send({'result':'token matched'})
})

module.exports=router;