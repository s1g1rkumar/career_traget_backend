const express=require('express');
const router=express.Router();
const jdoodle = require("jdoodle-api");



router.post('/compiler',async(req,res)=>
{
  const code=req.body;

  const language = {
    languageCode: "nodejs",
    versionIndex: 2
  };
  const script = "console.log('hello deepak')";
  
  jdoodle(language, script).then((result) => {
    console.log(result.output); // Hello World!
    res.status(200).send(result.output);
    //res.send('data');
  }).catch(err)
  {
  res.status(400).send('unable to compile');
  }
  });



module.exports=router;