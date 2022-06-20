import { Injectable } from "@nestjs/common";
import { ImaboItems } from "src/model/maboItems";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class MaboItemsRepository {
    constructor(@InjectModel('maboItems') private maboItemModel :Model<ImaboItems>){}

    async findAll() : Promise<ImaboItems[]>{
        return this.maboItemModel.find();
    }
   
    async findOneItem(id: string) : Promise<ImaboItems>{
        return this.maboItemModel.findById(id);
    }

    async updateItem(id:string, changes:any){
        delete changes._id;
        console.log('value of ID', id)
       return this.maboItemModel.findOneAndUpdate(
            {_id : id},
            changes,
            {new: true}
        )
    }
    
}