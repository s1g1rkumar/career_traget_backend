const express=require('express');
const router=express.Router();
const User=require('../Models/User');
const authenticate=require('../Middleware/authenticate');
require('../DB/connection');


router.get('/logout',(req,res)=>
{
  console.log('hello from logout section');
  res.clearCookie('jwtToken',{path:'/'});
  res.status(200).send('user logout');
  //res.send({'result':'token matched'})
})

module.exports=router;