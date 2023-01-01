import { Body, Controller, Post } from "@nestjs/common";
//import {nodemailer} from 'nodemailer';
const nodemailer=require('nodemailer');

@Controller('email')
export class EmailToClientController{
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
            html: this.getHtml(emailContent), // html body
        });
        console.log('Sent',info)

       }catch(error) {
         console.log(error);
         throw new Error(error);
       }
    }


    getHtml(emailContent: any) {
      if(emailContent.emailReportType === 'contact') {
          return `<h2>Hi a pontential client is trying to contact you<br> Info: <br>
          <lu>
            <li>name: ${emailContent.name}</li>
            <li>email: ${emailContent.email}</li>
            <li>phone: ${emailContent.phone}</li>
            <li>subject: ${emailContent.subject}</li>
            <li>message : ${emailContent.message}</li>
          </lu></h2>`
      } else if ( emailContent.emailReportType === 'order'){
        return `You have recieved an order from the following:<br>
        <ul>
           <li>Client Email : ${ emailContent.emailFrom}</li>
           <li>Client Name : ${emailContent.clientName}</li>
           <li>Client Surname : ${emailContent.clientSurname}</li>
           <li>Country :${emailContent.country} </li>
           <li>City : ${emailContent.city} </li>
           <li>State : ${emailContent.state} </li>
           <li>Street : ${emailContent. street} </li>
        </ul><br> <h3>The client have ordered the following book: ${emailContent.bookOrdered}</h3>`
      }

    }
}