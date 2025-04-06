import { Injectable } from '@nestjs/common';
import {BondAttackRepository} from '../repositories/bond-attack.repository';
import * as twilio from 'twilio';
import { bondTimeTable } from '../constants/bondTimeTable';
import * as dayjs from 'dayjs';
import {ILives, IBondAttackMemmber, ITeamStatusRes} from '../../model/familyBondStockvel.interface';
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
  async updatedBondAttackDocByUploaded( headers: any){
      try{
        const teamWhoSentReq = headers['source'];
        let currentKey;
        let bondStovelDoc = await this.bondAttackRepository.findBondAttackDoc();
        let allMembers = bondStovelDoc[0].membersByPlace;
        let currentMembers: any;
        let keys = Object.keys(allMembers);
        keys.forEach(key=>{
          if(teamWhoSentReq === key){
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

  calculateGoalsOfBond(
    payload :{
      principal: number, // Loan amount
      annualRate: number, // Annual interest rate (e.g., 10 for 10%)
      years: number, // Loan term in years
      extraPayment: number, // Extra monthly payment
    }
  ){

       // Convert annual rate to monthly
       const r = (payload.annualRate / 100) / 12;
       const N = payload.years * 12; // Convert years to months
   
       // Calculate original monthly payment
       const A = (payload.principal * r) / (1 - Math.pow(1 + r, -N));
   
       // Calculate total interest without extra payments
       const totalInterestOriginal = (A * N) - payload.principal;
   
       // New monthly payment after adding extra payment
       const A_new = A + payload.extraPayment;
   
       // Calculate new loan duration with extra payments
       const N_new = Math.ceil(Math.log(A / (A_new - r * payload.principal)) / Math.log(1 + r));
   
       // Calculate total interest with extra payments
       const totalInterestNew = (A_new * N_new) - payload.principal;
   
       // Calculate interest saved
       const interestSaved = totalInterestOriginal - totalInterestNew;
   
       return {
         originalTerm: `${Math.floor(N / 12)} years (${N} months)`,
         newTerm: `${Math.floor(N_new / 12)} years (${N_new} months)`,
         totalInterestWithoutExtra: `R${totalInterestOriginal.toFixed(2)}`,
         totalInterestWithExtra: `R${totalInterestNew.toFixed(2)}`,
         interestSaved: `R${interestSaved.toFixed(2)}`,
       };
  }

  async getStokvelTeamStatus(): Promise<ITeamStatusRes[]>{
    let response: Array<ITeamStatusRes> =[];
    let doc = await this.bondAttackRepository.findBondAttackDoc();
    let currentTeamPosition;
    Object.keys(doc[0].membersByPlace).forEach(memmber=>{
      let tempHolder : ITeamStatusRes ={
        team: memmber,
        status:'pending',
        position: 0
      };
      for(const key in bondTimeTable){
        if(tempHolder.team === key){
          tempHolder.position = bondTimeTable[key].position;
        }

      };
       let currentTeam = this.getCurrentRecievingMembers(doc);
       currentTeamPosition = bondTimeTable[currentTeam.currentRecievingkey].position;
       if(currentTeam.currentRecievingkey === memmber){
         tempHolder.status = 'active';
       } else if(tempHolder.position< currentTeamPosition) {
        tempHolder.status = 'completed';
       } else if(tempHolder.position> currentTeamPosition){
        tempHolder.status = 'pending';
       }

       response.push(tempHolder);

    });

       return response;
  }

}
