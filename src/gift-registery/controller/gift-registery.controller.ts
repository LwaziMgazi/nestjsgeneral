import { Controller , Post, Body, Put, Param, Get} from '@nestjs/common';
import { GiftRepository} from '../repositories/gifts.repository';
import { IGiftList } from '../interfaces/gift-list.Interface';
@Controller('gift-registery')
export class GiftRegisteryController {
    constructor(private giftRepo: GiftRepository ){

    }

    @Post('addgifts')
    addGiftList(@Body() reqBody: IGiftList){
      return this.giftRepo.createGiftentry(reqBody);
    }

    @Put('giftList/:id')
    updateGiftList(@Param('id') id: string, @Body() reqBody: IGiftList) {
        return this.giftRepo.updateGiftList(id,reqBody);
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

     return this.giftRepo.updateGiftList(giftList[0]._id.toString(), giftList[0]);
    }
}
