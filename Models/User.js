const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profession: {
    type: String,
  },
  bio: {
    type: String,
  },
  id:{
    type:String,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image:{

  },
  tokens:[
    {
      token:{
        type:String,
        // required:true
      }
    }
  ]
})




//hashing the pasword
userSchema.pre('save',async function(next)
{
  if(this.isModified('password'))
  {
    this.password=await bcrypt.hash(this.password,12);
    // this.cPassword=await bcrypt.hash(this.cPassword,12);
  }
  next();
})

//generating token
userSchema.methods.generateAuthToken=async function()
{
  try{
    let Token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:Token});
    await this.save();
    return Token;
  }catch(err)
  {
    console.log(err);
  }
}


const User = mongoose.model('USER', userSchema);

module.exports = User;
