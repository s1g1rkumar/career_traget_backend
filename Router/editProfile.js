const express=require('express');
const router=express.Router();
require('../DB/connection');
const User=require('../Models/User');


router.post('/editProfile',async(req,res)=>
{
  const {firstName,lastName,profession,bio,email,_id} = req.body;
    if(!firstName || !lastName || !profession || !bio )
    {
      return res.status(423).json({error:"plz fill all field properly"})
    }

    // console.log("my image ",image);
    try{
      var data={firstName,lastName,profession,bio};
     const userExist = await  User.findOne({email:email});
     if(userExist)  
     {
       const update=await User.findByIdAndUpdate(_id,data,{new:true});
       console.log(update);
        if(update !== ' ')
        {
          res.status(200).json({message:'profile updated sucessfully'});
        }
        else{
          res.status(500).json({error:'failed to update profile'})
        }
      }
    }
    catch(err){
      console.log(err);
    }
    
  });



module.exports=router;