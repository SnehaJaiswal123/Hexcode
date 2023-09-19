const nodemailer=require('nodemailer')
require('dotenv').config()

const mail=async (email,name)=>{
    try{
      var transporter = nodemailer.createTransport({
        secure: true, 
        service:'gmail',
        auth: {
        user: process.env.AUTH_EMAIL, 
        pass: process.env.AUTH_PASS, 
        authentication:'plain'
        },
         tls : {
        rejectUnauthorized:false
         }
      });
      const data={
        from: '"Team Conatus" <teamconatus@gmail.com>',  
        to:email,
        subject: "Congratulations! You're Successfully Registered",  
        html: `<p>Hello <b>${name}</b>,</p>

        <p>We are pleased to inform you that your registration for the <b>HEXCODE</b> recruitment drive, specially for the design team at <b>Team Conatus</b>, has been successfully received. We greatly appreciate your keen interest.</p>
    
        <p>Stay Tuned for important updates and announcements on our Instagram page:<a href="https://www.instagram.com/conatus.akg/">https://www.instagram.com/conatus.akg/</a></p>
    
    
        <p>If you have any questions or need assistance, feel free to reach out to us:<br> Divy Sharma : 9555353797<br> Siddharth Singh : 6393119695</p>
    
        <p>For additional information,<br>
        please visit our website:<br>
        <a href="https://teamconatus.com/">https://teamconatus.com/</a></p>
    
        <p>Thank you for your interest and best regards,<br> Team Conatus<br> Learn.Improvise.Grow
        </p>
    </body>`,          
       }
       transporter.sendMail(data,async(error,info)=>{
        if(error){
            throw new error;
        }
            console.log("email sent",info.messageId);
            
       });
    }
    catch(err){
      console.log(err);
    }
}

module.exports=mail;