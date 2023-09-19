const data = require("../model/user")
const mongoose=require('../db/mongoose')
const mail=require("../../nodemailer/mail")
const axios = require("axios");
require('dotenv').config()

module.exports.register=async function register(req,res) {
    const {captcha,email,student,phone,behance}=req.body;
    const secretkey = process.env.SECRET_KEY;
      try{
        const verifyurl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${captcha}`;
        const response = await axios.post(verifyurl)
         if(response.data.success){
                const emailexisted=await data.findOne({email})
                const studentexisted=await data.findOne({student})
                const phoneexisted=await data.findOne({phone})
                const behanceexisted=await data.findOne({behance})
                if(emailexisted){
                  console.log("user exist");
                 return res.status(409).send("user already registered")
                };
                if(studentexisted){
                  console.log("user exist");
                 return res.status(409).send("user already registered")
                };
                if(phoneexisted){
                  console.log("user exist");
                 return res.status(409).send("user already registered")
                };
                if(behanceexisted){
                  console.log("user exist");
                 return res.status(409).send("user already registered")
                };
                
                const registerdata=new data(req.body)
                  await registerdata.save() ;
                  await mail(req.body.email,req.body.name);      
                  res.status(200).send("registered") 
                  console.log("registered");                   
         }
       else{ 
            res.status(498).send("Invalid Captcha")
         }

        }
        catch(e){
            console.log("Error",e);
            return res.status(400).json({
                message:e.message,
                error:"invalid data"
            })
        }
        
            
}
