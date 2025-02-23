import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class RsvpRepository {
    constructor(@InjectModel('rsvps') private rsvpModel :Model<any>){}

    async findAll() : Promise<any[]>{
        return this.rsvpModel.find();
    }

    addEvent(newRsvp : any) {
        let addedEvent = new this.rsvpModel(
            newRsvp
        );

        addedEvent.save();
    }

   async update(newRsvp: any,id: string){
        delete newRsvp._id;
        let objToSave= {
            event:newRsvp.event,
            people: [...newRsvp.people],
            total: newRsvp.total
        }
        let rsvpDocument = await this.rsvpModel.findOneAndUpdate(
            {_id: id},
            objToSave,
            {new : true}
        )

        return rsvpDocument;
    }
    
    findById() {
        return this.rsvpModel.find({ event: 'MalusiAndReaWedding' })
    }

    
}