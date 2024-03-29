import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailToClientHtmlService {
  getHello(): string {
    return 'Hello World!';
  }

  getHtml(emailContent: any) {
    if(emailContent.emailReportType === 'contact') {
        let heading = emailContent?.source ==='weddingWeb'?'Hi Malusi someone is enquiring':
                  'Hi a pontential client is trying to contact you';
        return `<h2>${heading}<br> Info: <br>
        <lu>
          <li>name: ${emailContent.name || ''}</li>
          <li>email: ${emailContent.email || ''}</li>
          <li>phone: ${emailContent.phone || ''}</li>
          <li>subject: ${emailContent.subject || ''}</li>
          <li>message : ${emailContent.message || ''}</li>
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
    } else if(emailContent.emailReportType === 'meeting') {
      return `<h2>Some one is trying to have a meeting with you <br>
      <lu>
        <li>time: ${JSON.stringify(emailContent.time)}</li>
        <li>email: ${emailContent.nameAndSurname}</li>
        <li>phone: ${emailContent.email}</li>
        <li>subject: ${emailContent.shortProjectDescription}</li>
      </lu></h2>`
    }

  }
}
