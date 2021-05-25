const express = require('express');
const dotenv=require('dotenv');
const app = express();

dotenv.config({path:'./config.env'});//not need to call in all file
require('./DB/connection');//dor mongoose
app.use(express.json());
app.use(require('./Router/register'));//link the router file
app.use(require('./Router/signin'));
app.use(require('./Router/profile'))



const PORT=process.env.PORT;





app.get('/',(req,res)=>{
  res.send('hello from app home');
});


app.listen(PORT,()=>
{
  console.log(`server is created as port number ${PORT}`)
})