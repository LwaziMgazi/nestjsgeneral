import { Body, Controller, Post } from "@nestjs/common";
//import {nodemailer} from 'nodemailer';
const nodemailer=require('nodemailer');

@Controller('email')
export class EmailToClientController{
    @Post('client')
   async emailToClient(@Body() emailContent: any){
       console.log('lets send email.',emailContent)

       try {
        // let testAccount = await nodemailer.createTestAccount();
          // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.mail.us-east-1.awsapps.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
                user: "lwazi@airstudent.co.za", // generated ethereal user
                pass: "IloveGod@2", // generated ethereal password
              },
         });
         
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '<lwazi@airstudent.co.za>', // sender address
            to: "ntshangasent@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log('Sent')

       }catch(error) {
         console.log(error);
       }
    }
}