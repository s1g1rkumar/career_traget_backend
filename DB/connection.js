// 
const DB=process.env.DATABASE;
const mongoose=require('mongoose');
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>
{
  console.log('connection sucessfull');
}).catch((err)=>
{
  console.log('no connection');
})