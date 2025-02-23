import { Injectable } from "@nestjs/common";
import { IEvents} from "src/model/maboItems";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class EventRepository {
    constructor(@InjectModel('events') private eventModel :Model<IEvents>){}

    addEvent(newEvent : any) {
        let addedEvent = new this.eventModel(newEvent);

        addedEvent.save();
    }
    
    findByemail(email: string) {
        return this.eventModel.find({ refToUser : email })
    }
     
    async updateEvent(id:string, changes:any){
        delete changes._id;
       return this.eventModel.findOneAndUpdate(
            {_id : id},
            changes,
            {new: true}
        )
    }

}