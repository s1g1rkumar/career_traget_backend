const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
require("../DB/connection");
const User = require("../Models/User");
// const { response } = require('express');

const client = new OAuth2Client("501151150549-k2hb3ju8q1tecdhpoe7n856qrqh3125t.apps.googleusercontent.com");

router.post("/glogin",(req, res) => {
  //let token;
  const { gtoken } = req.body;
  console.log("google token id : ", gtoken, "....");
  try 
  {
        // let token; 
        client.verifyIdToken({ idToken: gtoken, audience: "501151150549-k2hb3ju8q1tecdhpoe7n856qrqh3125t.apps.googleusercontent.com" }).then(response => {
          // const { email_verified,email,name } = response.payload;
          const {email_verified,email,given_name,family_name}=response.payload;
          const mail_veri=email_verified;
          const firstname=given_name;
          const lastname=family_name
          const Email=email;
          console.log(response.payload);
          console.log(firstname);
          console.log(lastname);
          console.log(Email);
          if (mail_veri) {
            User.findOne({ email:Email }).then(function(user)
              {
                if(!user) 
                {
                  console.log('user not found');
                  console.log(user);
                  let newUser=new User({firstName:firstname,lastName:lastname,email:Email});
                    newUser.save((err,data)=>
                    {
                      if(err) 
                      {
                        console.log(err);
                        return res.status(400).json({ error: "something went wrong" });
                      }
                      const token=data.generateAuthToken();
                      console.log(token);
                      res.cookie("jwtToken",token,
                      {
                        expires:new Date(Date.now()+25892000000),
                        httpOnly:true
                      });               
                      res.status(200).json({token,data});
                    });//save close 
                  // return res.status(400).json({ error: "something went wrong" });
                }
                
                  if(user)
                  {
                    const token=user.generateAuthToken();
                    console.log(token);
                    const {_id,firstname,lastname,email}=user;
                    res.cookie("jwtToken",token,
                    {
                      expires:new Date(Date.now()+25892000000),
                      httpOnly:true
                    });
                    res.status(200).json({token,user});
                  }
                  else
                  {
                    // let fullname=name;
                    // let newUser=new User({firstName:firstname,lastName:lastname,email:Email});
                    // newUser.save((err,data)=>
                    // {
                    //   if(err) 
                    //   {
                    //     return res.status(400).json({ error: "something went wrong" });
                    //   }
                    //   const token=data.generateAuthToken();
                    //   console.log(token);
                    //   res.cookie("jwtToken",token,
                    //   {
                    //     expires:new Date(Date.now()+25892000000),
                    //     httpOnly:true
                    //   });               
                    //   res.status(200).json({token,data});
                    // });//save close 
                  }
                // }
                
              })//findone close
            }//email_verified if closed
            }).catch(err)
            {
            console.log(err);
            }
          }
          catch(error)
          {
            console.log(error);
            return;
          }
});//router close

module.exports = router;




