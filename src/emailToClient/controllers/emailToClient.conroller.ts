import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { EmailToClientHtmlService } from "src/shared/services/emailToClientHtml.service";
//import {nodemailer} from 'nodemailer';
const nodemailer=require('nodemailer');

@Controller('email')
export class EmailToClientController{

   constructor(private emailToClientHtmlService:EmailToClientHtmlService) {}
    @Post('client')
   async emailToClient(@Body() emailContent: any){

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
               tls:{
           rejectUnauthorized:false
         }
         });
         
        // send mail with defined transport object
        console.log('Tooo','<'+ emailContent.emailFrom +'>')
        let info = await transporter.sendMail({
            from: '<lwazi@airstudent.co.za>', // sender address
            to: emailContent.emailTo, // list of receivers
            subject: "New Book order", // Subject line
            text: "Order Details", // plain text body
            html: this.emailToClientHtmlService.getHtml(emailContent), // html body
        });
        console.log('Sent',info)

       }catch(error) {
         console.log(error);
         throw new Error(error);
       }
    }

    @Get('download')
    download(@Res() res) {
      return res.download('src/shared/files/Curriculum_Vitae_of_SLNtshangase.pdf');
    }


   
}