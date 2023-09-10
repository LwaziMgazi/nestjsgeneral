import { Injectable } from "@nestjs/common";
import { gift, IGiftList} from "../interfaces/gift-list.Interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class GiftRepository {
    constructor(@InjectModel('gifts') private giftsModel :Model<IGiftList>){}
   
     async createGiftentry(giftsObj: IGiftList ){
        let giftLists = new this.giftsModel(giftsObj);

        giftLists.save();
        
        return giftLists;
     }

     async updateGiftList(id: string, changes: any){
          delete changes._id ;
          return this.giftsModel.findOneAndUpdate(
            {_id: id},
            changes,
            {new: true}
          )
     }

     async getByEventName(eventName: string) {
        return this.giftsModel.find({ event : eventName })
     }

}