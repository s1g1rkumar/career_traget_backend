const express=require('express');
const router=express.Router();
require('../DB/connection');
const User=require('../Models/User');

router.get('/',(req,res)=>{
  res.send('hello from router home');
});




//---using sync await-----
router.post('/register',async(req,res)=>
{
  const {email,phone,password} = req.body;
    if(!email || !phone || !password)
    {
      return res.status(423).json({error:"plz fill all field properly"})
    }

    try{
      var str = email;
      var array = str.split("@");
      var id=array[0];
     const userExist = await  User.findOne({email:email});
     if(userExist)
        {
          return res.status(422).json({error:'user already exist'})
        }
        const user=new User({email,phone,password,id});
        
        const userReg = await user.save();
        if(userReg)
        {
          res.status(200).json({message:'your accout is created sucessfully'});
        }
        else{
          res.status(500).json({error:'failed to register'})
        }
    }
    catch(err){
      console.log(err);
    }
    
  });



module.exports=router;