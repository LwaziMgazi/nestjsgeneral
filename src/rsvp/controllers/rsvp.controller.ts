import {Body,Post, Controller,Put } from '@nestjs/common';
import {RsvpRepository} from '../repositories/rsvp.repository';
import {IRsvp} from '../interfaces/rsvp';
import {RsvpService} from '../rsvp.service'
@Controller('rsvp')
export class RsvpController {
    constructor(private rsvpRepo: RsvpRepository, private rsvpService:RsvpService){

    }

    @Post('addrsvp')
     addNewPeople(@Body() newRSVP) {
        return this.rsvpRepo.addEvent(newRSVP);
     }

     @Put('update')
    async updateRsvp(@Body() newRSVP) {
       let doc  = await this.rsvpRepo.findById()
       newRSVP.people.forEach(invited=>{
        doc[0].people.push(invited);
       })

       let totalPeople= doc[0].people.reduce((accu,currentValue)=>{
        return currentValue.noOfPeople + accu;
       },0)
       doc[0].total= totalPeople;
       await this.rsvpService.emailRsvpToClien(newRSVP,totalPeople);
        return this.rsvpRepo.update(doc[0], doc[0]._id);
     }
}
