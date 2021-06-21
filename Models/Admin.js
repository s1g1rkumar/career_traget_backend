const mongoose=require('mongoose');


const adminschema=new mongoose.Schema({
  lid:
  {
    type:String,
    required:true
  },
  pass:{
    type:String,
    required:true
  },
  tokens:[
    {
      token:{
        type:String,
      }
    }
  ]
})

const admin=mongoose.model('ADMIN',adminschema);
module.exports=admin;
