import { Controller , Post, Body, Put, Param, Get} from '@nestjs/common';
import { GiftRepository} from '../repositories/gifts.repository';
import { IGiftList } from '../interfaces/gift-list.Interface';
import {RsvpService} from '../../rsvp/rsvp.service';
@Controller('gift-registery')
export class GiftRegisteryController {
    constructor(private giftRepo: GiftRepository, private rsvpService :RsvpService  ){

    }

    @Post('addgifts')
    addGiftList(@Body() reqBody: IGiftList){
      return this.giftRepo.createGiftentry(reqBody);
    }

    @Put('giftList/:id')
  async  updateGiftList(@Param('id') id: string, @Body() reqBody: {giftList: IGiftList, metaData:any}) {
        console.log(reqBody)
        let emailreturn = this.rsvpService.sendClaimedGiftToUser(reqBody.metaData.email,reqBody.metaData.productName);
        return this.giftRepo.updateGiftList(id,reqBody.giftList);
    }

    @Get('gift-list/:event')
    getGiftList(@Param('event') event: string){
        return this.giftRepo.getByEventName(event);
    }

    @Get('gift/:email/:giftName')
    async updateTakenStatus(@Param('email') email,@Param('giftName') giftname) {
     let giftList = await this.giftRepo.getByEventName('MalusiAndReaWedding');
     
     let updatedItem= giftList[0].items.find(item=>item.name===giftname);
     updatedItem.claim.status= "taken";
     let index = giftList[0].items.findIndex(item=>item.name===giftname);
     giftList[0].items.splice(index,1);
     giftList[0].items.push(updatedItem);

     await this.giftRepo.updateGiftList(giftList[0]._id.toString(), giftList[0]);

     return {
        FromeUs: "THANK YOU"
     }
    }
}
