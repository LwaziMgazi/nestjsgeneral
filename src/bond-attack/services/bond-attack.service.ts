import { Injectable } from '@nestjs/common';
import {BondAttackRepository} from '../repositories/bond-attack.repository';
import * as twilio from 'twilio';
import { bondTimeTable } from '../constants/bondTimeTable';
import * as dayjs from 'dayjs';
import {ILives, IBondAttackMemmber} from '../../model/familyBondStockvel.interface';
import {AppConfig} from '../../config/app.config';
@Injectable()
export class BondAttackService {
    constructor(private bondAttackRepository:BondAttackRepository ){}

   async  performBondSmsSendingTasks() {
        try{
            let doc = await this.bondAttackRepository.findBondAttackDoc();
            const members= doc[0].membersByPlace;
            let lives:Array<ILives>=[];
            for(const key in members){
              lives.push(...members[key].lives);
            }
           let currentTeam: any;
            const today = dayjs();
            for(const key in bondTimeTable){
                let fromDate = dayjs(bondTimeTable[key].from);
                let toDate = dayjs(bondTimeTable[key].to);
                if(today.isAfter(fromDate) && today.isBefore(toDate)){
                  currentTeam = doc[0].membersByPlace[key]
                }
            }
           
            lives.forEach(async (life)=>{
                let day = dayjs().format('DD')
                if(day === life.payDay) {
                   await twilio(AppConfig.getTwilioAccount, AppConfig.getTwilioAuthToken).messages.create({
                        from:'+15406803032',
                        to:life.cellNumber,
                        body: 'Testing remmber to pay '
                        }).then(message => console.log(message.sid));
                }
            });

        }catch(err){
          console.error('Error occured',err)
        }    
  }
  async updatedBondAttackDocBuUploaded(fileInfo: any){
      try{
        let currentKey;
        let bondStovelDoc = await this.bondAttackRepository.findBondAttackDoc();
        let allMembers = bondStovelDoc[0].membersByPlace;
        let currentMembers: any;
        let keys = Object.keys(allMembers);
        keys.forEach(key=>{
          if(fileInfo.filename.includes(key)){
            currentKey = key;
            currentMembers = allMembers[key];
          }
        });
        if(currentMembers) {
           currentMembers.amountPaidOut= currentMembers.amountPaidOut + 5000;
        }
        bondStovelDoc[0].membersByPlace[currentKey]= currentMembers
        let currentRecievingMembers = this.getCurrentRecievingMembers(bondStovelDoc);
        currentRecievingMembers.currentTeam.receivedAmount = currentRecievingMembers.currentTeam.receivedAmount + 5000;
        bondStovelDoc[0].membersByPlace[currentRecievingMembers.currentRecievingkey]= currentRecievingMembers.currentTeam;
        return await this.bondAttackRepository.updateBondAttackDo(bondStovelDoc[0]._id, bondStovelDoc[0]);
         
      }catch(err) {
        throw err;
      }

  }

  getCurrentRecievingMembers( bondStovelDoc: any[]){
    let currentTeam: any;
    let currentRecievingkey;
    const today = dayjs();
    for(const key in bondTimeTable){
        let fromDate = dayjs(bondTimeTable[key].from);
        let toDate = dayjs(bondTimeTable[key].to);
        if(today.isAfter(fromDate) && today.isBefore(toDate)){
          currentTeam = bondStovelDoc[0].membersByPlace[key];
          currentRecievingkey = key
        }
    }
    return {
      currentRecievingkey,
      currentTeam};
  }

}
