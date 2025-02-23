import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {IBondAttackMemmber} from '../../model/familyBondStockvel.interface'
@Injectable()
export class  BondAttackRepository{
  constructor(@InjectModel('bondAttack') private familyBondAttack : Model<any>){}

  findBondAttackDoc(){
    return this.familyBondAttack.find({name:'bondAttack'});
  }

  async updateBondAttackDo(id:string, changes:any){
    delete changes._id;
    return this.familyBondAttack.findOneAndUpdate(
      {_id : id},
      changes,
      {new: true}
    )
  }
}