import { Injectable } from '@nestjs/common';
import { IRsvp } from './interfaces/rsvp';
const nodemailer=require('nodemailer');
@Injectable()
export class RsvpService {

  async  emailRsvpToClien(rsvpObject : IRsvp, totalPeople: number) {
       let names ='' ;
       let people = 0;
       rsvpObject.people.forEach(obj=>{
         names = names+''+obj.name;
         people = obj.noOfPeople;
       })
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
            let info = await transporter.sendMail({
                from: '<lwazi@airstudent.co.za>', // sender address
                to: 'ntshangasent@gmail.com,mgaziwedding@gmail.com', // list of receivers
                subject: "New RSVP for your Wedding , Ntshangase!", // Subject line
                text: "Some one would like to attend", // plain text body
                html: `<b>${names } has just sent a RSVP coming with ${people} people, total people confirmed is now ${totalPeople}</b>`, // html body
            });
            console.log('Sent',info)
            return info;
    
           }catch(error) {
             console.log(error);
             throw new Error(error);
           }
    }
}

